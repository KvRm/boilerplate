import type { Http } from 'types'

export function useCampaignUpdate() {
  const params = ref<Http.Campaign.Update.Request>({
    id: -1,
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
