<script setup lang="ts">
import { Http } from 'types'

const model = defineModel<boolean>()

const campaignHttpService = useCampaignHttpService()

const create = campaignHttpService.create()

const { params, description } = useCampaignCreate()
const { errors, isValid, isSubmitting, areParamsChanged, resetParams, submit } = useForm(Http.Campaign.Create.request, params)

const handleSubmit = submit(async (params) => {
  await create.mutateAsync(params)
  model.value = false
})

watch(model, resetParams)
</script>

<template>
  <UiDialog
    v-model="model"
    content-style="width: 800px; max-width: 80vw; "
  >
    <form relative flex="~ col" gap-4 @submit.prevent="handleSubmit">
      <UiInput v-model="params.name" :error-message="errors?.name" label="Название" />
      <UiInput v-model="description" :error-message="errors?.name" type="textarea" label="Описание" />
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
