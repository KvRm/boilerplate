<script setup lang="ts">
import { QTab, QTabs } from 'quasar'

export interface UiTab {
  name: string
  label: string
}

const props = defineProps<{
  modelValue: string
  tabs: UiTab[]
  disabled?: string[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <QTabs v-model="model" align="justify" active-color="primary" narrow-indicator dense h-16 text-gray-600>
    <QTab
      v-for="tab in tabs" :key="tab.name"
      :name="tab.name" :label="tab.label" no-caps
      :disable="props.disabled?.includes(tab.name)"
      @click="$emit('update:modelValue', tab.name)"
    />
  </QTabs>
</template>
