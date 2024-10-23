<script setup lang="ts">
const props = withDefaults(defineProps<{
  size: number
  isVertical?: boolean
  min?: number
}>(), {
  size: 50,
  min: 30,
})
const emit = defineEmits<{
  (e: 'update:size', value: number): void
}>()

const wrapperRef = ref<HTMLElement>()
const separatorRef = ref<HTMLElement>()

const { top, height } = useElementBounding(wrapperRef)
const { y } = useDraggable(separatorRef)

const topElementHeight = computed(() => {
  if (!y.value)
    return props.size
  return Math.min(Math.max(((y.value - top.value) / height.value) * 100, props.min), 100 - props.min) || 50
})

watch(topElementHeight, () => {
  emit('update:size', topElementHeight.value)
})
</script>

<template>
  <div ref="wrapperRef">
    <div :style="{ height: `calc(${topElementHeight}% - 2px)` }">
      <slot name="start" />
    </div>
    <div ref="separatorRef" h-1 flex-v-center cursor-n-resize>
      <UiSeparator w-full />
    </div>
    <div :style="{ height: `calc(${100 - topElementHeight}% - 2px)` }">
      <slot name="end" />
    </div>
  </div>
</template>
