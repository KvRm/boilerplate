<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'
import { QBreadcrumbs, QBreadcrumbsEl } from 'quasar'

export interface UiBreadcrumbOption {
  label: string
  to?: string | RouteLocationNamedRaw
}

defineProps<{
  options: UiBreadcrumbOption[]
}>()
</script>

<template>
  <QBreadcrumbs text-grey-600>
    <QBreadcrumbsEl
      v-for="option in options" :key="JSON.stringify(option)"
      :label="option.label"
      :to="option.to"
    />
  </QBreadcrumbs>
</template>
