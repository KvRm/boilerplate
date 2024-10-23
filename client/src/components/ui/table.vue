<script setup lang="ts" generic="T">
import { QTable } from 'quasar'
import type { QTableColumn } from 'quasar'
import type { SortingField, SortingOrderValue } from '~/types/sorting'

export type UiTableColumn = Omit<QTableColumn, 'field'> & { width?: number }

const props = defineProps<{
  rows: T[]
  columns: UiTableColumn[]
  selected?: T[]
  order?: Array<SortingOrderValue | undefined>
  orderFields?: SortingField[]
  isLoading?: boolean
  total?: number
  page?: number
  rowsPerPage?: number
  selectedRow?: T
  cellClass?: string
  cellStyle?: string | ((elem: T) => string)
  notFoundFallback?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:rowsPerPage', value: number): void
  (e: 'update:selected', value: T[]): void
  (e: 'rowClick', value: T): void
  (e: 'update:order', value: Array<SortingOrderValue | undefined>): void
}>()

const pageLocal = ref(1)
const rowsPerPageLocal = ref(25)

const paginationModel = computed({
  get() {
    return { page: pageLocal.value, rowsPerPage: rowsPerPageLocal.value }
  },
  set({ page, rowsPerPage }) {
    emit('update:page', page)
    emit('update:rowsPerPage', rowsPerPage)
  },
})

const selectedModel = computed({
  get() {
    return props.selected || []
  },
  set(value) {
    emit('update:selected', value)
  },
})

const {
  isAllSelected,
  isSomeSelected,
  checkIsSelected,
  toggleSelection,
  toggleSelectionAll,
} = useSelection({ model: selectedModel, rows: () => props.rows })

const columnsValue = computed<QTableColumn[]>(() => props.columns.map(col => ({
  ...col,
  field: col.name,
  align: 'left',
})))

const rowsValue = computed(() => {
  if (props.isLoading)
    return Array.from({ length: (pageLocal.value * rowsPerPageLocal.value) + 2 }).fill('')

  return props.rows
})

function getCellProps(width?: number) {
  if (!width)
    return

  return { width: `${width}px` }
}

function checkIsCellSelected(row: T) {
  return checkIsSelected(row) || compare(props.selectedRow, row)
}

function handleOrder(fieldName: string) {
  if (!props.orderFields?.some(elem => elem.value === fieldName))
    return

  let value = clone(props.order || [])
  const fieldValue = value.find(elem => elem?.field === fieldName)
  value = value.filter(elem => elem?.field !== fieldName)

  if (fieldValue?.direction !== 'desc') {
    let direction: string = 'asc'
    if (fieldValue?.direction === 'asc')
      direction = 'desc'

    if (value.length > 4)
      value = value.slice(0, 4)
    value.push({ field: fieldName, direction })
  }

  emit('update:order', value)
}

watch(pageLocal, () => {
  emit('update:page', pageLocal.value)
})
watch(rowsPerPageLocal, () => {
  emit('update:page', pageLocal.value)
})

watch(() => props.page, () => {
  pageLocal.value = props.page || 1
}, { immediate: true })
watch(() => props.rowsPerPage, () => {
  rowsPerPageLocal.value = props.rowsPerPage || 25
}, { immediate: true })
</script>

<template>
  <QTable
    v-model:pagination="paginationModel"
    :rows="rowsValue"
    :columns="columnsValue"
    row-key="name"
    class="ui-table"
    rows-per-page-label="Строк на странице"
    :rows-per-page-options="[25, 50, 100]"
    flat
  >
    <template #pagination="{ pagination, nextPage, prevPage, isFirstPage, isLastPage }">
      <div h-full flex-v-center gap-6.5>
        <span v-if="!isLoading" text-xs>
          {{
            `${(pagination.page - 1) * pagination.rowsPerPage + 1}-${Math.min((pagination.page) * pagination.rowsPerPage, total || rows.length)}
            из
            ${total || rows.length}`
          }}
        </span>
        <span v-else class="skeleton-loading-bg" h-4 w-20 rounded />

        <div flex-v-center gap-6>
          <button :disabled="isLoading || isFirstPage">
            <div i-ic:baseline-chevron-left h-6 w-6 text-grey-600 @click="prevPage()" />
          </button>
          <button :disabled="isLoading || isLastPage">
            <div i-ic:baseline-chevron-right h-6 w-6 text-grey-600 @click="nextPage()" />
          </button>
        </div>
      </div>
    </template>

    <template v-for="(column) in columnsValue" :key="column.name" #[`header-cell-${column.name}`]="{ col }">
      <th v-if="column.name === 'selection'" height="100%" class="selection-cell" v-bind="getCellProps(col.width)">
        <UiCheckbox
          :model-value="isSomeSelected || isAllSelected"
          size="s"
          :icon="!isAllSelected ? 'intermediate' : 'check'"
          @update:model-value="toggleSelectionAll"
        />
      </th>

      <th
        v-else
        class="text-left"
        :class="{ 'cursor-pointer': orderFields?.some((elem) => elem.value === col.name) }"
        v-bind="getCellProps(col.width)"
        @click="handleOrder(col.name)"
      >
        <div flex-v-center gap-1>
          {{ col.label }}
          <div
            v-if="order?.find((elem) => elem?.field === col.name)?.direction"
            i-ic:baseline-arrow-upward
            :class="{ 'rotate-180': order?.find((elem) => elem?.field === col.name)?.direction === 'desc' }"
            h-4 w-4 opacity-54 transition
          />
          <div v-else h-4 w-4 />
        </div>
      </th>
    </template>

    <template
      v-for="(column) in columnsValue" :key="column.name"
      #[`body-cell-${column.name}`]="{ row, pageIndex, col }"
    >
      <td
        v-bind="getCellProps(col.width)"
        class="text-left"
        :style="typeof cellStyle === 'function' ? cellStyle(row) : cellStyle"
        :class="[cellClass, { 'cell-selected': checkIsCellSelected(row) }]"
        @click="$emit('rowClick', row)"
      >
        <template v-if="column.name === 'selection'">
          <div v-if="isLoading" class="skeleton-loading-bg" h-4 w-4 rounded />
          <UiCheckbox
            v-else
            :model-value="checkIsSelected(row)"
            size="s"
            @update:model-value="toggleSelection($event, row)"
          />
        </template>

        <template v-else>
          <div v-if="isLoading" class="skeleton-loading-bg" h-full w-full rounded-1 />
          <div v-else flex-v-center>
            <slot :name="column.name" :index="pageIndex" :item="row as T" />
          </div>
        </template>
      </td>
    </template>

    <template #no-data>
      <div
        v-if="notFoundFallback && !isLoading"
        absolute bottom-0 left-0 right-0 top-0
        flex="col center" gap-3 text-align-center text-base text-grey-600
      >
        <div i-mdi:magnify h-6 w-6 />
        По вашему запросу ничего не найдено
      </div>
      <div />
    </template>
  </QTable>
</template>

<style lang="scss">
.ui-table {
  thead {
    font-size: 14px;

    tr {
      background: #fff;
    }
  }
  tbody {
    font-size: 14px;

    td {
      text-wrap: wrap;
    }

    tr:hover {
      background: var(--c-grey-100);
    }

    td:before {
      background: transparent !important;
    }
  }

  td,
  th,
  .q-table__bottom {
    border-color: var(--c-grey-200);
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  tbody {
    scroll-margin-top: 48px;
  }

  .q-table__bottom-item {
    color: var(--c-grey-600);
    line-height: 18px;
  }
}
.selection-cell {
  padding: 0 !important;
}
.cell-selected {
  background-color: var(--c-blue-100) !important;
}
</style>
