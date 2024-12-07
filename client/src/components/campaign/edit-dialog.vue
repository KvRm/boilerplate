<script setup lang="ts">
import { Http } from 'types'

const props = defineProps<{
  id: number
}>()

const model = defineModel<boolean>()

const campaignHttpService = useCampaignHttpService()

const update = campaignHttpService.update()

const { data, isLoading } = campaignHttpService.getEntity({ id: props.id })

const { params, description } = useCampaignUpdate()
const { errors, isValid, isSubmitting, areParamsChanged, resetParams, submit } = useForm(Http.Campaign.Update.request, params, { data })

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
    <form relative flex="~ col" gap-4 @submit.prevent="handleSubmit">
      <UiSpinner v-if="isLoading" fullsize />
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
