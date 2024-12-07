<template>
  <div h-18 flex-v-center justify-between px-4>
    <div flex-v-center>
      <RouteBack mr-4 p-1.5 text-sm btn-base />
      <slot name="prepend" />
    </div>
    <div v-if="$slots.append" flex-v-center>
      <slot name="append" />
    </div>
  </div>
</template>
