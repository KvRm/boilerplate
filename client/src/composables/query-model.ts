import { useRouteQuery } from '@vueuse/router'
import { format } from 'date-fns'
import destr from 'destr'

export interface UseIdModelOptions {
  queryKey?: string
}

export function useIdModel<T>(options?: UseIdModelOptions) {
  const { queryKey } = options || {}

  const id = queryKey ? useRouteQuery<string>(queryKey, '') : ref('')
  const entity = ref<T>()

  const model = computed({
    get() {
      return !!entity.value || !!id.value
    },
    set(value) {
      if (!value) {
        entity.value = undefined
        id.value = ''
      }
    },
  })

  return { model, id, entity }
}

export function useBooleanQueryModel(queryKey: string) {
  const queryModel = useRouteQuery<'0' | '1'>(queryKey, '0')

  const model = computed({
    get() {
      return !!Number(queryModel.value)
    },
    set(value) {
      queryModel.value = value ? '1' : '0'
    },
  })

  return model
}

export function useDateQueryModel(queryKey: string) {
  const queryModel = useRouteQuery<string>(queryKey)

  const model = computed({
    get() {
      return new Date(queryModel.value)
    },
    set(value) {
      queryModel.value = format(value, RU_DATE_FORMAT)
    },
  })

  return model
}

export function useObjectQueryModel<T extends object>(queryKey: string, defaultValue: T = {} as T) {
  const queryModel = useRouteQuery<string>(queryKey, encodeURI(JSON.stringify(defaultValue)))

  const model = computed({
    get() {
      return destr<T>(decodeURI(queryModel.value))
    },
    set(value) {
      queryModel.value = encodeURI(JSON.stringify(value))
    },
  })

  return model
}
