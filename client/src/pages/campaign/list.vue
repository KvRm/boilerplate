<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { format } from 'date-fns'
import type { Http } from 'types'
import type { UiTableColumn } from '~/components/ui/table.vue'

const router = useRouter()

const columns: UiTableColumn[] = [
  { name: 'name', label: 'Название' },
  { name: 'status', label: 'Статус', width: 244 },
  { name: 'updater', label: 'Последнее изменение', width: 244 },
  { name: 'created', label: 'Дата создания', width: 200 },
  { name: 'updated', label: 'Дата изменения', width: 200 },
  { name: 'executed', label: 'Дата запуска', width: 200 },
]

const isCreateDialogOpen = ref(false)

const limit = useRouteQuery(URL_QUERY_KEYS.CAMPAIGN_LIST_LIMIT, 25, { transform: Number })
const page = useRouteQuery(URL_QUERY_KEYS.CAMPAIGN_LIST_PAGE, 1, { transform: Number })
const search = useRouteQuery(URL_QUERY_KEYS.CAMPAIGN_LIST_SEARCH, '')
const { campaignList, isCampaignListLoading } = useCampaignPreparedList({
  filters: () => ({ searchQuery: search.value || undefined }),
  limit,
  page,
})

function handleRouteClick(row: Http.Campaign.GetList.Response['list'][0]) {
  router.push({ name: ROUTE_NAMES.CAMPAIGN.DETAIL, params: { [URL_PARAMS_KEYS.CAMPAIGN_DETAIL_ID]: row.id } })
}
</script>

<template>
  <BaseHeader>
    <template #prepend>
      <span text-xl font-500>Кампании</span>
    </template>
    <template #append>
      <UiButton color="primary" @click="isCreateDialogOpen = true">
        Создать кампанию
      </UiButton>
    </template>
  </BaseHeader>

  <div mx-5>
    <UiInput v-model="search" label="Поиск" :debounce="500" />
  </div>

  <UiTable
    v-model:rows-per-page="limit"
    v-model:page="page"
    :is-loading="isCampaignListLoading"
    class="h-[calc(100vh-128px)]" p-2
    :columns="columns"
    :rows="campaignList?.list || []"
    :total="campaignList?.total"
    cell-class="cursor-pointer"
    @row-click="handleRouteClick($event)"
  >
    <template #name="{ item }">
      {{ item.name }}
    </template>
    <template #created="{ item }">
      {{ format(item.createdAt, RU_DATE_DOT_FORMAT) }}
    </template>
    <template #updated="{ item }">
      <template v-if="item.updatedAt">
        {{ format(item.updatedAt, RU_DATE_DOT_FORMAT) }}
      </template>
    </template>
    <template #executed="{ item }">
      <template v-if="item.executedAt">
        {{ format(item.executedAt, RU_DATE_DOT_FORMAT) }}
      </template>
    </template>
    <template #updater="{ item }">
      {{ item.updaterId }}
    </template>
    <template #status="{ item }">
      <CampaignStatusBadge :status="item.status" />
    </template>
  </UiTable>

  <CampaignCreateDialog v-model="isCreateDialogOpen" />
</template>
