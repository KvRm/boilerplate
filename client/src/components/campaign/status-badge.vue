<script setup lang="ts">
import type { Model } from 'types'

const props = defineProps<{
  status: keyof typeof Model.campaingStatus
}>()

const title = computed(() => {
  if (props.status === 'active')
    return 'Согласована'

  if (props.status === 'draft')
    return 'Драфт'
  return props.status
})
</script>

<template>
  <div
    rounded px-2 py-1
    :class="{
      'bg-grey-200 text-grey-600': status === 'draft',
      'bg-green-200 text-green-400': status === 'active',
    }"
  >
    {{ title }}
  </div>
</template>
