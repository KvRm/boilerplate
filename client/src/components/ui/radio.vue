<script setup lang="ts" generic="Value extends string = string">
import { QRadio } from 'quasar'

export interface UiRadionOption<Value extends string = string> {
  label: string
  value: Value
}

const props = defineProps<{
  modelValue?: Value
  options: UiRadionOption<Value>[]
  label?: string
  errorMessage?: string
  isDisabled?: boolean
  size?: 'xs'
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value?: Value): void
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const sizeValue = computed(() => {
  if (props.size === 'xs')
    return '32px'

  return undefined
})
</script>

<template>
  <div flex="~ col" gap-2>
    <span v-if="label" text-base font-500 :class="{ 'text-red-300': errorMessage }">{{ label }}</span>
    <div flex-v-center gap-7>
      <QRadio
        v-for="option in options"
        :key="JSON.stringify(option)" v-model="model"
        :disable="isDisabled"
        text-base
        :size="sizeValue"
        :val="option.value" :label="option.label"
      />
    </div>
    <span v-if="errorMessage" px-3 text-xs text-red-300>{{ errorMessage }}</span>
  </div>
</template>
