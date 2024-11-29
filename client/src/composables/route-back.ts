import type { Router } from 'vue-router'

export function isRouteBackValid(routerParam?: Router) {
  const routerInstance = routerParam || router
  return !!routerInstance.options.history.state.back
}

export function routeBack(routerParam?: Router) {
  if (!isRouteBackValid(routerParam))
    return

  (routerParam || router).back()
}
