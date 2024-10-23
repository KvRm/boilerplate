<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  isDisabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const model = computed({
  get() {
    return Number(props.modelValue)
  },
  set(value) {
    emit('update:modelValue', Number(value))
  },
})
</script>

<template>
  <div flex-v-center>
    <UiButton flat :is-disabled="isDisabled" @click="emit('update:modelValue', Math.max(model - 1, 0)) ">
      <div i-material-symbols:horizontal-rule w-10 text-grey-600 />
    </UiButton>
    <UiInput v-model="model" :is-disabled="isDisabled" type="number" min="0" />
    <UiButton flat :is-disabled="isDisabled" @click="emit('update:modelValue', model + 1)">
      <div i-ic:baseline-plus w-10 text-grey-600 />
    </UiButton>
  </div>
</template>
