<template>
  <div h-18 flex-v-center justify-between pl-4>
    <div flex-v-center>
      <RouteBack mr-4 flex-center rounded hover:bg-grey-100 p-1.5 text-sm text-grey-600 />
      <slot name="prepend" />
    </div>
    <div v-if="$slots.append" flex-v-center>
      <slot name="append" />
    </div>
  </div>
</template>
