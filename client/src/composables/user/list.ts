import type { Http } from 'types'
import type { TanstackQueryOptions } from '~/types/tanstack-query'

interface Props {
  filters?: MaybeRefOrGetter<
    Http.User.GetList.Request['filters']
  >
  limit?: MaybeRefOrGetter<Http.User.GetList.Request['limit']>
  page?: MaybeRefOrGetter<Http.User.GetList.Request['page']>
  order?: MaybeRefOrGetter<Http.User.GetList.Request['order']>
}

export function useUserPreparedList(props?: Props, queryOptions?: TanstackQueryOptions) {
  const userHttpService = useUserHttpService()

  const filters = ref<Http.User.GetList.Request['filters']>({})
  const limit = ref<Http.User.GetList.Request['limit']>(25)
  const page = ref<Http.User.GetList.Request['page']>(0)
  const order = ref<Http.User.GetList.Request['order']>()

  const params = computed<Http.User.GetList.Request>(() => ({
    filters: toValue(props?.filters) ?? filters.value,
    limit: toValue(props?.limit) ?? limit.value,
    page: toValue(props?.page) ?? page.value,
    order: toValue(props?.order) ?? order.value,
  }))

  const { data, isLoading } = userHttpService.getList(params, queryOptions)

  return {
    userListLimit: limit,
    userListpage: page,
    userListFilters: filters,
    userListParams: params,
    userList: data,
    isUserListLoading: isLoading,
  }
}
