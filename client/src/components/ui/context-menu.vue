<script setup lang="ts">
export interface UiContextOption {
  icon?: string
  handler: () => unknown
  [key: string]: any
}

defineProps<{
  options: UiContextOption[]
  offset?: [number, number]
  anchor?: string
  self?: string
}>()

const model = ref(false)
</script>

<template>
  <button h-7 w-7 btn-base @click.stop>
    <div i-mdi:dots-vertical />

    <UiMenu v-model="model" :options="options" :offset="offset" :anchor="anchor" :self="self">
      <template #option="{ option }">
        <div flex-v-center gap-4>
          <div h-5>
            <div :class="option.icon" text-grey-600 />
          </div>
          <div w-full line-height-none>
            <slot name="option" :option="option" />
          </div>
        </div>
      </template>
    </UiMenu>
  </button>
</template>
