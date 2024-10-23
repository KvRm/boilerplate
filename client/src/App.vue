<script setup lang="ts">
setupTypeboxErrors()
setupTypeboxFormats()
</script>

<template>
  <RouterView />
  <UiSpinner v-if="isDialogSubmitting" fullsize />
</template>
