<script setup lang="ts">
import { computed } from 'vue'
import { Input, Select } from '@/lib/components'
import { IconSearch, IconClose } from '@/lib/icons'
import { columnSelectOptions, filters } from '../state/filters'

const model = defineModel({
  type: String,
  default: '',
})

const emit = defineEmits({
  focus: () => true,
  clear: () => true,
})

const hasSearchText = computed(() => model.value.length > 0)

function onClear() {
  model.value = ''
  emit('clear')
}
</script>

<template>
  <Input
    v-model="model"
    class="book-page-search-input"
    placeholder="Найти ту самую книгу"
    @focus="emit('focus')"
  >
    <template #left>
      <IconSearch v-if="!hasSearchText" />
      <IconClose v-else class="clear" @click="onClear" />
    </template>
    <template #right>
      <Select
        v-model="filters.searchColumn"
        :options="columnSelectOptions"
        :map-key="(it) => it.id"
        :map-title="(it) => it.title"
      />
    </template>
  </Input>
</template>

<style lang="scss">
.book-page-search-input .right-group .select {
  &.opened {
    background: none;
  }

  .selected-value:hover {
    background: none;
  }
}
</style>

<style scoped lang="scss">
.book-page-search-input {
  background: #fff;

  .clear {
    cursor: pointer;
  }
}
</style>
