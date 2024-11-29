import { useQuery } from '@tanstack/vue-query'
import { Http } from 'types'
import type { MaybeRefOrGetter } from 'vue'
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
      queryKey: [...getEntityQueryKey, params],
      queryFn: ({ signal }) =>
        jsonRpcFetch<Http.User.GetEntity.Response>(
          Http.methodList.user.getEntity.path,
          toValue(params),
          signal,
        ),
    })
  }


  // create() {
  //   const queryClient = useQueryClient()
  //   const uiKit = useUIKit()

  //   return useMutation({
  //     mutationFn: (params: HttpProtocol.Domains.TaskTrackerDomain.Task.Create.Params) =>
  //       apiClient.jsonRpcFetch(
  //         HttpProtocol.Domains.TaskTrackerDomain.Task.Create.method.name,
  //         params,
  //       ),
  //     onSuccess: () => {
  //       uiKit.toast({ message: 'Задача создана', type: 'success' })
  //       JournalHttpService.invalidate.getPreparedList(queryClient)
  //       TaskHttpService.invalidate.getPreparedList(queryClient)
  //       TaskHttpService.invalidate.getHierarchy(queryClient)
  //     },
  //   })
  // }

  // static invalidate = {
  //   getPreparedList(queryClient: QueryClient) {
  //     queryClient.invalidateQueries({ queryKey: TaskHttpService.getPreparedListQueryKey })
  //   },
  //   getHierarchy(queryClient: QueryClient) {
  //     queryClient.invalidateQueries({ queryKey: TaskHttpService.getHierarchyQueryKey })
  //   },
  //   getEntity(queryClient: QueryClient, id: string) {
  //     queryClient.invalidateQueries({ queryKey: [...TaskHttpService.getEntityQueryKey, id] })
  //   },
  //   getAcl(queryClient: QueryClient, entityId: string) {
  //     queryClient.invalidateQueries({ queryKey: [...TaskHttpService.getAclQueryKey, entityId] })
  //   },
  //   getBreadCrumbs(queryClient: QueryClient, id: string) {
  //     queryClient.invalidateQueries({ queryKey: [...TaskHttpService.getBreadCrumbsQueryKey, id] })
  //   },
  //   getRelations(queryClient: QueryClient) {
  //     queryClient.invalidateQueries({ queryKey: [...TaskHttpService.getRelationsQueryKey] })
  //   },
  // }

  // static reset = {
  //   getEntity(queryClient: QueryClient, id: string) {
  //     queryClient.resetQueries({ queryKey: [...TaskHttpService.getEntityQueryKey, id] })
  //   },
  //   getBreadCrumbs(queryClient: QueryClient, id: string) {
  //     queryClient.resetQueries({ queryKey: [...TaskHttpService.getBreadCrumbsQueryKey, id] })
  //   },
  // }

  return {
    getList,
    getEntity,
  }
}
