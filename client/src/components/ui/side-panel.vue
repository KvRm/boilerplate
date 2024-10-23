<script setup lang="ts">
defineProps<{
  modelValue: boolean
  rerenderKey?: string | number
}>()
</script>

<template>
  <Teleport to="#app">
    <Transition name="slide-right">
      <div
        v-if="modelValue" :key="rerenderKey" v-bind="$attrs"
        absolute bottom-0 right-0 z-1 class="h-[calc(100vh-64px)]"
      >
        <div h-full bg-white>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
