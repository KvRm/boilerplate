import type { Http } from 'types'

export function useCampaignCreate() {
  const params = ref<Http.Campaign.Create.Request>({
    name: '',
    description: null,
  })

  const description = computed({
    get() {
      return params.value.description || ''
    },
    set(value) {
      params.value.description = value || null
    },
  })

  return { params, description }
}
