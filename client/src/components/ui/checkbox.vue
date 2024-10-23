<script setup lang="ts">
import { QCheckbox } from 'quasar'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  size: 's'
  icon?: 'check' | 'intermediate'
  label?: string
}>(), {
  icon: 'check',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const model = computed({
  get() {
    if (!props.modelValue)
      return false
    return props.icon === 'intermediate' ? null : props.modelValue
  },
  set(value) {
    emit('update:modelValue', !!value)
  },
})

const sizeValue = computed(() => {
  if (props.size === 's')
    return '26px'

  return undefined
})
</script>

<template>
  <QCheckbox v-model="model" class="ui-checkbox" :size="sizeValue" :label="label" />
</template>

<style lang="scss">
.ui-checkbox {
  .q-checkbox__bg {
    border-color: var(--c-grey-600);
  }

  .q-checkbox__inner--truthy,
  .q-checkbox__inner--indet {
    .q-checkbox__bg {
      border-color: var(--c-blue-300);
    }
  }
}
</style>
