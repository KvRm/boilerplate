<script setup lang="ts">
setupTypeboxErrors()
setupTypeboxFormats()

const userHttpService = useUserHttpService()

const { data } = userHttpService.getList({ limit: 10, offset: 0 })
</script>

<template>
  {{ data }}
  <RouterView />
  <!-- <UiSpinner fullsize /> -->
</template>
