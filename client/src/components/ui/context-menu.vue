<script setup lang="ts" generic="T extends { icon?: string, handler: () => unknown }">
defineProps<{
  active?: boolean
  options: T[]
  offset?: [number, number]
  anchor?: string
  self?: string
}>()

const model = ref(false)
</script>

<template>
  <button v-show="active === undefined || active === true || model" @click.stop>
    <div i-mdi:dots-vertical h-5 w-5 text-grey-600 :class="{ 'bg-blue-500': !!model }" />

    <UiMenu v-model="model" :options="options" :offset="offset" :anchor="anchor" :self="self">
      <template #option="{ option }">
        <div flex-v-center gap-8>
          <div h-5 w-6>
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
