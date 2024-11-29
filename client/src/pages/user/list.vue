<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { format } from 'date-fns'
import type { Http } from 'types'
import type { UiTableColumn } from '~/components/ui/table.vue'
import { DATE_TIME_DEFAULT_FORMAT } from '~/constants/date'

const router = useRouter()

const columns: UiTableColumn[] = [
  { name: 'name', label: 'Полное имя', width: 500 },
  { name: 'email', label: 'Почтовый адрес', width: 500 },
  { name: 'actions', label: '' },
]

const limit = useRouteQuery(URL_QUERY_KEYS.USER_LIST_LIMIT, 25, { transform: Number })
const page = useRouteQuery(URL_QUERY_KEYS.USER_LIST_PAGE, 1, { transform: Number })
const { userList, isUserListLoading } = useUserPreparedList({ limit, page })

function handleRouteClick(row: Http.User.GetList.Response['list'][0]) {
  router.push({ name: ROUTE_NAMES.USER.DETAIL, params: { [URL_PARAMS_KEYS.USER_DETAIL_ID]: row.id } })
}
</script>

<template>
  <BaseHeader>
    <template #prepend>
      <span text-xl font-500>Пользователи</span>
    </template>
  </BaseHeader>

  <UiTable
    v-model:rows-per-page="limit"
    v-model:page="page"
    :is-loading="isUserListLoading"
    class="h-[calc(100vh-108px)]" mt-5 :columns="columns"
    :rows="userList?.list || []"
    :total="userList?.total"
    cell-class="cursor-pointer"
    @row-click="handleRouteClick($event)"
  >
    <template #name="{ item }">
      {{ item.lastName }}
      {{ item.firstName }}
      {{ item.secondName }}
    </template>
    <template #email="{ item }">
      {{ item.email }}
    </template>
    <template #actions="{ item }">
      <div w-full flex justify-end>
        {{ format(item.updatedAt, DATE_TIME_DEFAULT_FORMAT) }}
      </div>
    </template>
  </UiTable>
</template>
