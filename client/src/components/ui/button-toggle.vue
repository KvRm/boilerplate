<script setup lang="ts">
import { QBtnToggle } from 'quasar'

export interface UiButtonToggleOption {
  label: string
  value: string
}

const props = defineProps<{
  modelValue: string
  options: UiButtonToggleOption[]
  flat?: boolean
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
  <QBtnToggle
    v-model="model" class="ui-button-toggle" toggle-color="primary" :options="options" no-caps flat
    :class="{ 'ui-button-toggle-flat': flat }"
  />
</template>

<style lang="scss">
.ui-button-toggle {
  border: 1px solid var(--c-blue-300);

  .q-btn {
    font-size: 12px !important;
  }

  .q-btn {
    border-left: 1px solid var(--c-blue-300);

    &:first-child {
      border-left: none;
    }
  }

  .q-btn[aria-pressed='true'] {
    background-color: var(--c-blue-100);
  }
}
.ui-button-toggle-flat {
  border: 1px solid transparent;

  .q-btn {
    border-right: none;
    border-left: none;
  }

  .q-btn[aria-pressed='true'] {
    background-color: var(--c-blue-100);
    border-right: 1px solid var(--c-blue-300);
    border-left: 1px solid var(--c-blue-300);

    &:last-child {
      border-right: none;
    }
    &:first-child {
      border-left: none;
    }
  }
}
</style>
