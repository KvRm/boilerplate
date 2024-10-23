<script setup lang="ts" generic="Value">
import { QSelect } from 'quasar'

const props = defineProps<{
  modelValue?: Value
  errorMessage?: string
  options: Value[]
  isDisabled?: boolean
  isLoading?: boolean
  labelKey?: keyof Value
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value?: Value): void
}>()

const qSelectRef = ref<QSelect>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const preparedOptions = computed(() => {
  if (!props.labelKey)
    return props.options

  return props.options.map(value => ({ ...value, label: value[props.labelKey as keyof Value] }))
})

function focus() {
  qSelectRef.value?.focus()
}

defineExpose({ focus })
</script>

<template>
  <QSelect
    ref="qSelectRef"
    v-model="model"
    class="ui-select"
    :options="preparedOptions"
    :loading="isLoading"
    :disable="isDisabled || isLoading"
    :error="!!errorMessage" :error-message="errorMessage"
    popup-content-class="ui-select-popup box-shadow-popup"
    filled no-error-icon hide-bottom-space
  >
    <template #selected>
      <slot name="selected" />
      <template v-if="Array.isArray(modelValue) && modelValue.length">
        Выбрано: {{ modelValue.length }}
      </template>
    </template>
  </QSelect>
</template>

<style lang="scss">
.ui-select {
  .q-field__control {
    background: var(--c-grey-100);

    &:hover,
    &:focus {
      background: var(--c-grey-200);
    }

    &::placeholder {
      color: var(--c-grey-600);
    }
  }

  .q-field__control:before {
    background: transparent !important;
    border-bottom: 1px solid var(--c-grey-400);
  }

  .q-field__control:hover.q-field__control:before {
    border-bottom: 2px solid var(--c-grey-400) !important;
  }
}

.ui-select-popup {
  --at-apply: rounded-b-2 py-2 text-base;
}
</style>
