<script setup lang="ts" generic="T extends { handler: () => unknown }">
import { QItem, QList, QMenu } from 'quasar'

const props = defineProps<{
  modelValue?: boolean
  options: T[]
  offset?: [number, number]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value?: boolean): void
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
  <QMenu v-model="model" class="box-shadow-popup ui-menu" fit rounded-2 py-2 :offset="offset">
    <QList>
      <QItem
        v-for="option in options" :key="JSON.stringify(option)"
        v-close-popup clickable flex-v-center bg-white text-base
        @click="option.handler()"
      >
        <slot name="option" :option="option" />
      </QItem>
    </QList>
  </QMenu>
</template>
