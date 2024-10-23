<script setup lang="ts">
import { QDialog } from 'quasar'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
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
  <QDialog v-model="model" class="ui-modal">
    <div class="box-shadow-popup ui-modal-inner" rounded-3 bg-white>
      <slot />
    </div>
  </QDialog>
</template>

<style>
.ui-modal-inner {
  max-width: none !important;
}
</style>
