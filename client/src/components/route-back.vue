<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'

const props = defineProps<{
  fallbackRoute?: string | RouteLocationNamedRaw
}>()

const router = useRouter()

function handleClick() {
  if (!isRouteBackValid.value && props.fallbackRoute) {
    router.push(props.fallbackRoute)
    return
  }

  routeBack(router)
}
</script>

<template>
  <button v-if="isRouteBackValid || fallbackRoute" @click="handleClick">
    <div i-material-symbols:arrow-back-ios-new />
  </button>
</template>
