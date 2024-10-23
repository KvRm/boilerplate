import type { Router } from 'vue-router'

export const isRouteBackValid = computed(() => {
  const router = useRouter()
  return !!router.options.history.state.back
})

export function routeBack(router: Router = useRouter()) {
  if (!isRouteBackValid.value)
    return

  router.back()
}
