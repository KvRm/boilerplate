import { type TSchema, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import type { PromisifyFn } from '@vueuse/core'
import { useDebounceFn } from '@vueuse/core'
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'
import { computed, ref, toValue, watch } from 'vue'

interface FormOptions<Data extends object> {
  data?: Ref<Data | undefined>
}

interface UseFormReturn<Params> {
  isValidated: Ref<Readonly<boolean>>
  isSubmitting: Ref<Readonly<boolean>>
  isValid: Ref<Readonly<boolean>>
  isRefetching: Ref<Readonly<boolean>>
  errors: Ref<Record<keyof Params, string> | undefined>
  areParamsChanged: ComputedRef<boolean>
  validate: () => boolean
  submit: (
    cb: (params: Params) => void | Promise<void>,
    errorCb?: ((error: Error) => void | Promise<void>) | undefined,
  ) => () => Promise<void>
  debouncedRefetch: (cb: () => void | Promise<void>) => PromisifyFn<() => Promise<void>>
  resetInitialParams: () => void
  resetParams: () => void
}

export function useForm<Params extends object, Data extends object>(
  schema: MaybeRefOrGetter<TSchema>,
  params: Ref<Params>,
  options?: FormOptions<Data>,
): UseFormReturn<Params> {
  const { data } = options || {}

  /** Флажок, была ли провалидирована форма */
  const isValidated = ref(false)
  const isRefetching = ref(false)
  const isSubmitting = ref(false)
  const isValid = ref(true)
  const errors = ref<Record<keyof Params, string>>()
  const initialParams = ref(clone(params.value)) as Ref<Params>

  const areParamsChanged = computed(() => {
    return !compare(params.value, initialParams.value)
  })

  function resetInitialParams() {
    isValidated.value = false
    isValid.value = true
    errors.value = undefined
    initialParams.value = clone(params.value)
  }

  function resetParams() {
    isValidated.value = false
    isValid.value = true
    errors.value = undefined
    params.value = clone(initialParams.value)
  }

  function validate() {
    if (!isValidated.value) {
      isValidated.value = true
    }

    const errorsAsArray = [...Value.Errors(toValue(schema), params.value)]

    errors.value = errorsAsArray.reduce((prev, curr) => {
      const name = curr.path.slice(1)
      const err = {
        [name]: params.value[name as keyof typeof params.value]
          ? curr.message
          : 'Поле не может быть пустым',
      }

      return { ...prev, ...err }
    }, {} as Record<keyof Params, string>)

    const validationResult = !errorsAsArray.length

    isValid.value = validationResult
    return validationResult
  }

  const submit
    = (
      cb: (params: Params) => void | Promise<void>,
      errorCb?: (error: Error) => void | Promise<void>,
    ) =>
      async () => {
        if (isSubmitting.value)
          return
        if (data?.value && !areParamsChanged.value)
          return
        if (!validate())
          return

        try {
          isSubmitting.value = true
          await cb(params.value)
        }
        catch (error) {
          errorCb?.(error as Error)
        }
        finally {
          isSubmitting.value = false
        }
      }

  const debouncedRefetch = (cb: () => void | Promise<void>) =>
    useDebounceFn(async () => {
      if (!cb)
        return
      try {
        isRefetching.value = true
        await cb()
        setParamsFromData()
      }
      finally {
        isRefetching.value = false
      }
    }, 200)

  function setParamsFromData() {
    if (!data?.value)
      return

    params.value = {
      ...(Value.Cast(Type.Required(toValue(schema)), {
        ...data.value,
      }) as any),
    }
    resetInitialParams()
  }

  watch(
    params,
    () => {
      if (isValidated.value) {
        validate()
      }
    },
    { deep: true },
  )

  watch(
    () => data?.value,
    () => {
      setParamsFromData()
    },
    { immediate: true },
  )

  return {
    isValidated,
    isSubmitting,
    isValid,
    isRefetching,
    errors,

    areParamsChanged,

    validate,
    submit,
    debouncedRefetch,
    resetInitialParams,
    resetParams,
  }
}
