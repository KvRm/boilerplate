<script setup lang="ts">
import { Http } from 'types'

const props = defineProps<{
  id: number
}>()

const model = defineModel<boolean>()

const userHttpService = useUserHttpService()

const update = userHttpService.update()

const { data, isLoading } = userHttpService.getEntity({ id: props.id })

const { params, secondName, department, jobTitle } = useUserUpdate()
const { errors, isValid, isSubmitting, areParamsChanged, resetParams, submit } = useForm(Http.User.Update.request, params, { data })

const handleSubmit = submit(async (params) => {
  await update.mutateAsync(params)
  model.value = false
})

watch(model, resetParams)
</script>

<template>
  <UiDialog
    v-model="model"
    content-style="width: 800px; max-width: 80vw; "
  >
    <form relative @submit.prevent="handleSubmit">
      <UiSpinner v-if="isLoading" fullsize />
      <div flex="~ col" gap-4>
        <UiInput v-model="params.firstName" :error-message="errors?.firstName" label="Имя" />
        <UiInput v-model="params.lastName" :error-message="errors?.lastName" label="Фамилия" />
        <UiInput v-model="secondName" :error-message="errors?.secondName" label="Отчество" />
        <div flex gap-4>
          <UiInput v-model="params.email" :error-message="errors?.email" label="Email" />
          <UiInput v-model="params.phone" :error-message="errors?.phone" label="Номер телефона" />
        </div>
        <div flex gap-4>
          <UiInput v-model="department" :error-message="errors?.department" label="Департамент" />
          <UiInput v-model="jobTitle" :error-message="errors?.jobTitle" label="Должность" />
        </div>
      </div>
      <div mt-6 flex justify-end gap-4>
        <UiButton @click="model = false">
          Отменить
        </UiButton>
        <UiButton
          color="primary"
          :is-loading="isSubmitting" :is-disabled="!isValid || !areParamsChanged"
          type="submit"
        >
          Сохранить
        </UiButton>
      </div>
    </form>
  </UiDialog>
</template>
