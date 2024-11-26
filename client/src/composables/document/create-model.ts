import type { Http } from 'types'

export function useUserCreateModel() {
  const params = ref<Required<Http.User.List.Request>>({
    filters: {},
    limit: 10,
    offset: 10,
    order: 'ASC',
  })

  return {
    params,
  }
}
