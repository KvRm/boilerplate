import type { QueryClient } from '@tanstack/vue-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Http } from 'types'
import type { MaybeRefOrGetter } from 'vue'
import { toast } from 'vue3-toastify'
import type { TanstackQueryOptions } from '~/types/tanstack-query'

export function useCampaignHttpService() {
  const queryKey = ['campaign']

  const getListQueryKey = [
    ...queryKey,
    Http.methodList.campaign.getList,
  ]
  const getEntityQueryKey = [
    ...queryKey,
    Http.methodList.campaign.getEntity,
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
    params: MaybeRefOrGetter<Http.Campaign.GetList.Request>,
    queryOptions: TanstackQueryOptions = {},
  ) {
    return useQuery({
      ...queryOptions,
      queryKey: [...getListQueryKey, params],
      queryFn: ({ signal }) =>
        jsonRpcFetch<Http.Campaign.GetList.Response>(
          Http.methodList.campaign.getList.path,
          toValue(params),
          signal,
        ),
    })
  }

  function getEntity(
    params: MaybeRefOrGetter<Http.Campaign.GetEntity.Request>,
    queryOptions: TanstackQueryOptions = {},
  ) {
    return useQuery({
      ...queryOptions,
      queryKey: [...getEntityQueryKey, toRef(toValue(params).id)],
      queryFn: ({ signal }) =>
        jsonRpcFetch<Http.Campaign.GetEntity.Response>(
          Http.methodList.campaign.getEntity.path,
          toValue(params),
          signal,
        ),
    })
  }

  function create() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.Campaign.Create.Request) =>
        jsonRpcFetch(Http.methodList.campaign.create.path, params),
      onSuccess: () => {
        toast('Компания создана', { type: 'success' })
        invalidate.getList(queryClient)
      },
    })
  }

  function update() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.Campaign.Update.Request) =>
        jsonRpcFetch(Http.methodList.campaign.update.path, params),
      onSuccess: (d, { id }) => {
        toast('Компания обновлена', { type: 'success' })
        invalidate.getList(queryClient)
        invalidate.getEntity(queryClient, id)
      },
    })
  }

  function remove() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.Campaign.Remove.Request) =>
        jsonRpcFetch(Http.methodList.campaign.remove.path, params),
      onSuccess: (d, { id }) => {
        toast('Компания удалена', { type: 'success' })
        invalidate.getList(queryClient)
        reset.getEntity(queryClient, id)
      },
    })
  }

  function accept() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: Http.Campaign.Accept.Request) =>
        jsonRpcFetch(Http.methodList.campaign.accept.path, params),
      onSuccess: (d, { id }) => {
        toast('Компания согласована', { type: 'success' })
        invalidate.getList(queryClient)
        invalidate.getEntity(queryClient, id)
      },
    })
  }

  return {
    getList,
    getEntity,
    create,
    update,
    remove,
    accept,
    invalidate,
    reset,
  }
}
