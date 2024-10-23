<script setup lang="ts">
import { QBtn } from 'quasar'

withDefaults(defineProps<{
  isDisabled?: boolean
  color?: 'primary' | 'secondary' | 'negative'
  type?: 'submit'
  size?: 'sm' | 'md'
  flat?: boolean
  isLoading?: boolean
}>(), {
  size: 'md',
})
</script>

<template>
  <QBtn
    :class="[`ui-button-${size}`]"
    :loading="isLoading" :disable="isDisabled"
    :color="isDisabled ? 'secondary' : color " :type="type" :flat="flat"
    :size="size" no-caps
  >
    <slot />
  </QBtn>
</template>

<style lang="scss">
.ui-button-md {
  font-size: 16px !important;
}
.ui-button-sm {
  font-size: 14px !important;
}
</style>
