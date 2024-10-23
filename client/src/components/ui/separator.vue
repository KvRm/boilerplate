<script setup lang="ts">
import { QSeparator } from 'quasar'

defineProps<{
  vertical?: boolean
}>()
</script>

<template>
  <QSeparator :vertical="vertical" class="ui-separator" />
</template>

<style>
.ui-separator {
  background: var(--c-grey-300);
}
</style>
