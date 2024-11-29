<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'

const props = defineProps<{
  fallbackRoute?: string | RouteLocationNamedRaw
}>()

const router = useRouter()

function handleClick() {
  if (props.fallbackRoute)
    return router.push(props.fallbackRoute)
  routeBack(router)
}
</script>

<template>
  <button v-if="isRouteBackValid(router) || fallbackRoute" @click="handleClick">
    <div i-material-symbols:arrow-back-ios-new />
  </button>
</template>
