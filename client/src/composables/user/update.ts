import type { Http } from 'types'

export function useUserUpdate() {
  const params = ref<Http.User.Update.Request>({
    id: -1,
    email: '',
    firstName: '',
    lastName: '',
    secondName: '',
    phone: '',
    department: '',
    jobTitle: '',
  })

  const secondName = computed<string>({
    get() {
      return params.value.secondName || ''
    },
    set(value) {
      params.value.secondName = value || null
    },
  })

  const department = computed<string>({
    get() {
      return params.value.department || ''
    },
    set(value) {
      params.value.department = value || null
    },
  })

  const jobTitle = computed<string>({
    get() {
      return params.value.jobTitle || ''
    },
    set(value) {
      params.value.jobTitle = value || null
    },
  })

  return { params, secondName, department, jobTitle }
}
