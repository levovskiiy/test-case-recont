<script lang="ts" setup>
import { Select } from '@/lib/components'
import { sortOrderSelectOptions, sortColumnSelectOptions } from '../state/sort'

const order = defineModel('order', {
  type: String,
  required: true,
})

const column = defineModel('column', {
  type: String,
  required: true,
})
</script>

<template>
  <div class="book-list-sorts">
    <Select
      v-model="order"
      title="Порядок сортировки"
      :options="sortOrderSelectOptions"
      :map-key="(it) => it.id"
      :map-title="(it) => it.title"
      class="sort-select"
    />
    <Select
      v-model="column"
      title="Сортировать"
      :options="sortColumnSelectOptions"
      :map-key="(it) => it.id"
      :map-title="(it) => it.title"
      class="sort-select"
    />
  </div>
</template>

<style lang="scss" scoped>
.book-list-sorts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .sort-select {
    flex: 1;
  }
}
</style>
