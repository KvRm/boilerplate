<script setup lang="ts">
import { QSpinner } from 'quasar'

withDefaults(defineProps<{
  size?: string
  fullsize?: boolean
}>(), { size: '3em' })
</script>

<template>
  <div flex-center :class="{ 'ui-spinner-fullsize': fullsize }">
    <QSpinner :size="size" color="primary" relative z-1 />
    <div v-if="fullsize" absolute bottom-0 left-0 right-0 top-0 bg-white opacity-40 />
  </div>
</template>

<style>
.ui-spinner-fullsize {
  --at-apply: absolute top-0 left-0 right-0 bottom-0;
}
</style>
