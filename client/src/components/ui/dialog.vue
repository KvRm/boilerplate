<script setup lang="ts">
import type { QDialogProps } from 'quasar'
import { QDialog } from 'quasar'
import type { StyleValue } from 'vue'

defineProps<QDialogProps & {
  contentStyle?: StyleValue
}>()

const model = defineModel<boolean>()
</script>

<template>
  <QDialog v-model="model">
    <div bg-white p-6 :style="contentStyle">
      <slot />
    </div>
  </QDialog>
</template>
