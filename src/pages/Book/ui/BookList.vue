<script setup lang="ts">
import { computed } from 'vue'
import { bookCount, books } from '../state/list'
import { BookListItem } from '.'

defineEmits(['edit-book', 'remove-book'])

const hasBooks = computed(() => bookCount.value > 0)
</script>

<template>
  <div class="book-list">
    <template v-if="hasBooks">
      <BookListItem
        v-for="(book, id) in books"
        :key="book.id"
        :author="book.author"
        :category="book.genre"
        :created-year="book.year"
        :name="book.name"
        @remove="$emit('remove-book', book, id)"
        @edit="$emit('edit-book', book, id)"
      />
    </template>
    <div v-else class="text-base text-color-placeholder">По вашему запросу ничего не найдено</div>
  </div>
</template>

<style lang="scss" scoped>
.book-list {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
}
</style>
