<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import type { Http } from 'types'
import type { UiTableColumn } from '~/components/ui/table.vue'

const router = useRouter()

const columns: UiTableColumn[] = [
  { name: 'name', label: 'Полное имя', width: 300 },
  { name: 'email', label: 'Email', width: 220 },
  { name: 'phone', label: 'Номер телефона', width: 200 },
  { name: 'department', label: 'Департамент', width: 220 },
  { name: 'jobTitle', label: 'Должность' },
  { name: 'actions', label: '' },
]

const limit = useRouteQuery(URL_QUERY_KEYS.USER_LIST_LIMIT, 25, { transform: Number })
const page = useRouteQuery(URL_QUERY_KEYS.USER_LIST_PAGE, 1, { transform: Number })
const search = useRouteQuery(URL_QUERY_KEYS.USER_LIST_SEARCH, '')
const { userList, isUserListLoading } = useUserPreparedList({
  filters: () => ({ searchQuery: search.value || undefined }),
  limit,
  page,
})

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

  <div mx-5>
    <UiInput v-model="search" label="Поиск" :debounce="500" />
  </div>

  <UiTable
    v-model:rows-per-page="limit"
    v-model:page="page"
    :is-loading="isUserListLoading"
    class="h-[calc(100vh-128px)]" p-2
    :columns="columns"
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
    <template #phone="{ item }">
      {{ item.phone }}
    </template>
    <template #department="{ item }">
      {{ item.department }}
    </template>
    <template #jobTitle="{ item }">
      {{ item.jobTitle }}
    </template>
  </UiTable>
</template>
