<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { format } from 'date-fns'
import type { UiContextOption } from '~/components/ui/context-menu.vue'

const userHttpService = useUserHttpService()

const remove = userHttpService.remove()

const id = useRouteParams(URL_PARAMS_KEYS.USER_DETAIL_ID, URL_PARAMS_KEYS.USER_DETAIL_ID, { transform: Number })

const isEditDialogOpen = ref(false)

const { data, isLoading } = userHttpService.getEntity({ id: id.value })

async function handleRemove() {
  createDialog({
    title: 'Удаление пользователя',
    message: 'Вы действительно хотите удалить пользователя?',
    onOk: async () => await remove.mutateAsync({ id: id.value }),
  })
}

const contextOptions: UiContextOption[] = [
  {
    icon: 'i-material-symbols:edit-outline',
    label: 'Редактировать',
    handler: () => isEditDialogOpen.value = true,
  },
  {
    icon: 'i-ic:outline-delete',
    label: 'Удалить',
    handler: handleRemove,
  },
]
</script>

<template>
  <BaseHeader border-b-1 border-grey-300>
    <template #prepend>
      <span text-xl font-500>Пользователь</span>
    </template>
  </BaseHeader>

  <div relative flex class="h-[calc(100vh-72px)]">
    <UiSpinner v-if="isLoading" fullsize />
    <div relative w-128 border-r-1 border-grey-300 px-10 py-8>
      <UiContextMenu absolute right-2 top-2 :options="contextOptions">
        <template #option="{ option }">
          {{ option.label }}
        </template>
      </UiContextMenu>

      <template v-if="!isLoading && data">
        <div flex gap-4>
          <div max-h-24 max-w-24 min-h-24 min-w-24 rounded-full bg-black />
          <div flex="~ col">
            <span text-xl font-500>
              {{ data.lastName }}
              {{ data.firstName }}
              {{ data.secondName }}
            </span>
            <span mt-1.5 text-grey-600>Зарегистрирован {{ format(data.createdAt, RU_DATE_DOT_FORMAT) }}</span>
            <a text-md mt-1.5 flex-v-center cursor-pointer gap-1 text-blue-300>
              <div i-material-symbols:mail-outline />{{ data.email }}
            </a>
            <a text-md mt-0.5 flex-v-center cursor-pointer gap-1 text-blue-300>
              <div i-material-symbols:call-outline />{{ data.phone }}
            </a>
          </div>
        </div>

        <div v-if="data.department" mt-10 flex="~ col">
          <span text-bold text-lg font-500>Департамент</span>
          <span mt-2 text-blue-300>{{ data.department }}</span>
        </div>
        <div v-if="data.jobTitle" mt-4 flex="~ col">
          <span text-bold text-lg font-500>Должность</span>
          <span mt-2>{{ data.jobTitle }}</span>
        </div>
      </template>
    </div>
  </div>

  <UserEditDialog :id v-model="isEditDialogOpen" />
</template>
