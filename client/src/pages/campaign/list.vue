<script setup lang="ts">
import { format } from 'date-fns'
import type { UiTableColumn } from '~/components/ui/table.vue'
import { DATE_TIME_DEFAULT_FORMAT } from '~/constants/date'

const router = useRouter()

const columns: UiTableColumn[] = [
  { name: 'name', label: 'Название' },
  { name: 'created', label: 'Дата создания', width: 200 },
  { name: 'updated', label: 'Дата изменения', width: 200 },
  { name: 'executed', label: 'Дата запуска', width: 200 },
  { name: 'author', label: 'Автор', width: 244 },
]
const rows = [
  { id: '213', name: 'Вклад для котов', createdAt: new Date(), updatedAt: new Date(), executedAt: new Date(), authorId: 'Иванов И.И.' },
  { id: '214', name: 'Берем кредиты мы в совкомбанке', createdAt: new Date(), updatedAt: new Date(), authorId: 'Иванов И.И.' },
]

function handleRouteClick(row: (typeof rows)[number]) {
  router.push({ name: ROUTE_NAMES.CAMPAIGN.DETAIL, params: { [URL_PARAMS_KEYS.CAMPAIGN_DETAIL_ID]: row.id } })
}
</script>

<template>
  <div p-2>
    <div mt-2 flex-v-center justify-between pl-4>
      <span text-xl font-500>Кампании</span>
      <UiButton color="primary">
        Создать кампанию
      </UiButton>
    </div>

    <UiTable
      class="h-[calc(100vh-86px)]" mt-5 :columns="columns" :rows="rows"
      cell-class="cursor-pointer"
      @row-click="handleRouteClick($event)"
    >
      <template #name="{ item }">
        {{ item.name }}
      </template>
      <template #created="{ item }">
        {{ format(item.createdAt, DATE_TIME_DEFAULT_FORMAT) }}
      </template>
      <template #updated="{ item }">
        {{ format(item.updatedAt, DATE_TIME_DEFAULT_FORMAT) }}
      </template>
      <template #executed="{ item }">
        <template v-if="item.executedAt">
          {{ format(item.executedAt, DATE_TIME_DEFAULT_FORMAT) }}
        </template>
      </template>
      <template #author="{ item }">
        {{ item.authorId }}
      </template>
    </UiTable>
  </div>
</template>
