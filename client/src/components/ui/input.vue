<script setup lang="ts">
import type { QInputProps } from 'quasar'
import { QIcon, QInput } from 'quasar'

export interface UiInputRef {
  blur: () => void
  focus: () => void
}

const props = withDefaults(defineProps<QInputProps & {
  modelValue?: string | number
  isDisabled?: boolean
  errorMessage?: string
  type?: 'text' | 'number' | 'date' | 'password' | 'textarea'
  clearable?: boolean
  dense?: boolean
  debounce?: number
}>(), {
  type: 'text',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | number): void
  (e: 'blur'): void
}>()

const qInputRef = ref<QInput>()

const showPassword = ref(false)

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value || '')
  },
})

const typeValue = computed(() => {
  if (props.type !== 'password')
    return props.type

  return showPassword.value ? 'text' : 'password'
})

function focus() {
  qInputRef.value?.focus()
}
function blur() {
  qInputRef.value?.blur()
}

defineExpose<UiInputRef>({ focus, blur })
</script>

<template>
  <QInput
    ref="qInputRef"
    v-model="model" class="ui-input" :type="typeValue"
    :disable="isDisabled"
    :error="!!errorMessage" :error-message="errorMessage"
    filled no-error-icon hide-bottom-space text-base
    :label :dense :clearable :debounce
    clear-icon="close"
    @blur="$emit('blur')"
  >
    <template v-if="type === 'password'" #append>
      <QIcon
        :name="showPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </template>
  </QInput>
</template>

<style lang="scss">
.ui-input {
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border: 4px solid var(--c-grey-400);
    border-radius: 8px;
    background: var(--c-grey-400);
  }
  ::-webkit-scrollbar-thumb:hover {
    border: 2px solid var(--c-grey-400);
    border-radius: 8px;
  }

  .q-field__control {
    background: var(--c-grey-100);

    &:hover {
      background: var(--c-grey-200);
      // border-bottom: 2px solid var(--c-grey-500);
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
.ui-input.q-field {
  width: 100%;
}
</style>
