export {}

declare module 'vue-router' {
  interface RouteMeta {
    isAuthRequired?: boolean
  }
}
