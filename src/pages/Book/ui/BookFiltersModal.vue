<script setup lang="ts">
import { reactive } from 'vue'
import { Dialog } from '@/lib/components'
import { useConfirmDialog } from '@/lib/composables'
import { cloneMaybeReactive } from '@/lib/utils'
import type { Filters, Sorts } from '../state/schema'
import { DEFAULT_FILTERS } from '../state/filters'
import { DEFAULT_SORT, sort } from '../state/sort'
import { BookListFilters, BookListSorts } from '.'

const {
  open: _open,
  opened,
  confirm,
  cancel,
} = useConfirmDialog<{
  sort: Sorts
  filters: Filters
}>()

const filtersState = reactive<Filters>(structuredClone(DEFAULT_FILTERS))
const sortState = reactive<Sorts>(structuredClone(DEFAULT_SORT))

function reset() {
  Object.assign(filtersState, structuredClone(DEFAULT_FILTERS))
  Object.assign(sortState, structuredClone(DEFAULT_SORT))
}

function open(filters: Filters, sort: Sorts) {
  reset()
  Object.assign(filtersState, cloneMaybeReactive(filters))
  Object.assign(sortState, cloneMaybeReactive(sort))
  return _open()
}

function save() {
  return confirm({
    sort: cloneMaybeReactive(sortState),
    filters: cloneMaybeReactive(filtersState),
  })
}

defineExpose({
  open,
})
</script>

<template>
  <Dialog title="Фильтры" fullscreen :visible="opened" class="book-filters-modal" @close="cancel">
    <div class="content">
      <BookListSorts v-model:column="sort.sortColumn" v-model:order="sort.sortOrder" />
      <BookListFilters
        v-model:authors="filtersState.authors"
        v-model:genres="filtersState.genres"
        v-model:years="filtersState.years"
      />
    </div>
    <template #footer>
      <button class="button primary" @click="save">Применить фильтры</button>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.book-filters-modal {
  .content {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    gap: 12px;
  }
}
</style>
