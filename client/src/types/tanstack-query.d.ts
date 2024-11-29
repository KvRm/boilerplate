import type { keepPreviousData } from '@tanstack/vue-query'

export interface TanstackQueryOptions {
  enabled?: boolean | MaybeRefOrGetter<boolean>
  placeholderData?: typeof keepPreviousData
}
