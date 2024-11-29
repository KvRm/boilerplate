<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'
import { format } from 'date-fns'

const userHttpService = useUserHttpService()

const id = useRouteParams(URL_PARAMS_KEYS.USER_DETAIL_ID, URL_PARAMS_KEYS.USER_DETAIL_ID, { transform: Number })

const { data, isLoading } = userHttpService.getEntity({ id: id.value })
</script>

<template>
  <BaseHeader border-b-1 border-grey-300>
    <template #prepend>
      <span text-xl font-500>Пользователь</span>
    </template>
  </BaseHeader>

  <div flex class="h-[calc(100vh-72px)]">
    <div w-128 border-r-1 border-grey-300 px-10 py-8>
      <template v-if="!isLoading && data">
        <div flex gap-4>
          <div h-24 w-24 rounded-full bg-black />
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
              <div i-material-symbols:call-outline />+7922344212
            </a>
          </div>
        </div>

        <div mt-10 flex="~ col">
          <span text-bold text-lg font-500>Департамент</span>
          <span mt-2 text-blue-300>Управление аналитикой клиентского обслуживания (УАКО)</span>
        </div>
        <div mt-4 flex="~ col">
          <span text-bold text-lg font-500>Должность</span>
          <span mt-2>Старший-аналитик</span>
        </div>
      </template>
    </div>
  </div>
</template>
