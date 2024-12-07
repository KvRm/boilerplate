import type { Http } from 'types'
import type { TanstackQueryOptions } from '~/types/tanstack-query'

interface Props {
  filters?: MaybeRefOrGetter<
    Http.Campaign.GetList.Request['filters']
  >
  limit?: MaybeRefOrGetter<Http.Campaign.GetList.Request['limit']>
  page?: MaybeRefOrGetter<Http.Campaign.GetList.Request['page']>
  order?: MaybeRefOrGetter<Http.Campaign.GetList.Request['order']>
}

export function useCampaignPreparedList(props?: Props, queryOptions?: TanstackQueryOptions) {
  const campaignHttpService = useCampaignHttpService()

  const filters = ref<Http.Campaign.GetList.Request['filters']>({})
  const limit = ref<Http.Campaign.GetList.Request['limit']>(25)
  const page = ref<Http.Campaign.GetList.Request['page']>(0)
  const order = ref<Http.Campaign.GetList.Request['order']>()

  const params = computed<Http.Campaign.GetList.Request>(() => ({
    filters: toValue(props?.filters) ?? filters.value,
    limit: toValue(props?.limit) ?? limit.value,
    page: toValue(props?.page) ?? page.value,
    order: toValue(props?.order) ?? order.value,
  }))

  const { data, isLoading } = campaignHttpService.getList(params, queryOptions)

  return {
    campaignListLimit: limit,
    campaignListpage: page,
    campaignListFilters: filters,
    campaignListParams: params,
    campaignList: data,
    isCampaignListLoading: isLoading,
  }
}
