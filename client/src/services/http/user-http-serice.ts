import type { QueryClient } from '@tanstack/vue-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Http } from 'types'
import type { MaybeRefOrGetter } from 'vue'
import { toast } from 'vue3-toastify'
import type { TanstackQueryOptions } from '~/types/tanstack-query'

export function useUserHttpService() {
  const queryKey = ['user']

  const getListQueryKey = [
    ...queryKey,
    Http.methodList.user.getList,
  ]
  const getEntityQueryKey = [
    ...queryKey,
    Http.methodList.user.getEntity,
  ]

  const invalidate = {
    getList(queryClient: QueryClient) {
      queryClient.invalidateQueries({ queryKey: getListQueryKey })
    },
    getEntity(queryClient: QueryClient, id: number) {
      queryClient.invalidateQueries({ queryKey: [...getEntityQueryKey, id] })
    },
  }

  const reset = {
    getEntity(queryClient: QueryClient, id: number) {
      queryClient.resetQueries({ queryKey: [...getEntityQueryKey, id] })
    },
  }

  function getList(
    params: MaybeRefOrGetter<Http.User.GetList.Request>,
    queryOptions: TanstackQueryOptions = {},
  ) {
    return useQuery({
      ...queryOptions,
      queryKey: [...getListQueryKey, params],
      queryFn: ({ signal }) =>
        jsonRpcFetch<Http.User.GetList.Response>(
          Http.methodList.user.getList.path,
          toValue(params),
          signal,
        ),
    })
  }

  function getEntity(
    params: MaybeRefOrGetter<Http.User.GetEntity.Request>,
    queryOptions: TanstackQueryOptions = {},
  ) {
    return useQuery({
      ...queryOptions,
      queryKey: [...getEntityQueryKey, toRef(toValue(params).id)],
      queryFn: ({ signal }) =>
        jsonRpcFetch<Http.User.GetEntity.Response>(
          Http.methodList.user.getEntity.path,
          toValue(params),
          signal,
        ),
    })
  }

  function update() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.User.Update.Request) =>
        jsonRpcFetch(Http.methodList.user.update.path, params),
      onSuccess: (d, { id }) => {
        toast('Пользователь обновлен', { type: 'success' })
        invalidate.getList(queryClient)
        invalidate.getEntity(queryClient, id)
      },
    })
  }

  function remove() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.User.Remove.Request) =>
        jsonRpcFetch(Http.methodList.user.remove.path, params),
      onSuccess: (d, { id }) => {
        toast('Пользователь удален', { type: 'success' })
        invalidate.getList(queryClient)
        reset.getEntity(queryClient, id)
      },
    })
  }

  return {
    getList,
    getEntity,
    update,
    remove,
    invalidate,
    reset,
  }
}
