import type { MaybeRefOrGetter, Ref, WritableComputedRef } from 'vue'
import { computed } from 'vue'

interface SelectionArgs<T> {
  rows: MaybeRefOrGetter<T[]>
  isLoading?: MaybeRefOrGetter<boolean>
  model: Ref<T[]>
}

interface Selection<T> {
  isAllSelected: WritableComputedRef<boolean>
  isSomeSelected: ComputedRef<boolean>

  selectAll: () => void
  unselectAll: () => void
  toggleSelection: (value: boolean, row: T) => void
  toggleSelectionAll: (value: boolean) => void
  select: (row: T) => void
  unselect: (row: T) => void
  checkIsSelected: (row: T) => boolean
}

export function useSelection<T>({ isLoading, rows, model }: SelectionArgs<T>) {
  const isAllSelectedComputed = computed<boolean>(() => {
    return (
      !toValue(isLoading)
      && !!model.value.length
      && model.value.length === toValue(rows).length
    )
  })

  const isSomeSelected = computed<boolean>(() => !toValue(isLoading) && !!model.value.length)

  const isAllSelected = computed<boolean>({
    get() {
      return isAllSelectedComputed.value
    },
    set() {
      if (isAllSelectedComputed.value)
        unselectAll()
      else
        selectAll()
    },
  })

  function checkIsSelected(row: T) {
    return model.value.some(e => compare(row, e))
  }

  function toggleSelection(value: boolean, row: T) {
    if (value)
      select(row)
    else
      unselect(row)
  }

  function toggleSelectionAll(value: boolean) {
    if (value)
      selectAll()
    else
      unselectAll()
  }

  function select(row: T) {
    model.value = [...model.value, row]
  }

  function unselect(row: T) {
    model.value = model.value.filter(selectedRow => !compare(selectedRow, row))
  }

  function selectAll() {
    model.value = [...toValue(rows)]
  }

  function unselectAll() {
    model.value = []
  }

  const composition: Selection<T> = {
    isAllSelected,
    isSomeSelected,

    selectAll,
    unselectAll,
    toggleSelection,
    toggleSelectionAll,
    select,
    unselect,
    checkIsSelected,
  }

  return composition
}
