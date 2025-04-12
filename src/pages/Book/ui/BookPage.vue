<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useConfirm, useMediaQuery, useMobile } from '@/lib/composables'
import { TABLET } from '@/lib/constants/breakpoints'
import type { Book } from '@/entities/book'
import { addBook, editBook, removeBook } from '../state/list'
import { filters } from '../state/filters'
import { sort } from '../state/sort'
import {
  BookEditModal,
  BookPageHeader,
  BookList,
  BookListSorts,
  BookListFilters,
  BookFiltersModal,
} from '.'

const isMobile = useMobile()
const isTablet = useMediaQuery(`(max-width: ${TABLET}px)`)
const bookEditModal = useTemplateRef<BookEditModal>('bookEditModal')

async function onCreateBook() {
  const { data, canceled } = await bookEditModal.value!.open()

  if (data && !canceled) {
    addBook(data)
  }
}

async function onEditBook(book: Book, index: number) {
  const { data, canceled } = await bookEditModal.value.open(book)
  if (data && !canceled) {
    editBook(book, index)
  }
}

async function onRemoveBook(book: Book) {
  const { canceled } = await useConfirm({
    title: 'Вы уверены что хотите удалить книгу?',
    text: 'Данные будут навсегда удалены',
  })

  if (canceled) {
    return
  }

  removeBook(book.id)
}

const filtersModal = useTemplateRef<BookFiltersModal>('bookFiltersModal')

async function updateFilters() {
  const { data, canceled } = await filtersModal.value.open(filters, sort)
  if (data && !canceled) {
    Object.assign(filters, data.filters)
    Object.assign(sort, data.sort)
  }
}
</script>

<template>
  <div class="book-page">
    <BookPageHeader :is-mobile="isMobile" @add-book="onCreateBook" />

    <main class="content container">
      <template v-if="!isTablet">
        <BookListSorts
          v-model:order="sort.sortOrder"
          v-model:column="sort.sortColumn"
          class="sorts"
        />
        <BookListFilters
          v-model:years="filters.years"
          v-model:authors="filters.authors"
          v-model:genres="filters.genres"
          class="filters"
        />
      </template>
      <button v-else class="button no-border" @click="updateFilters">Фильтры</button>
      <BookList class="books" @edit-book="onEditBook" @remove-book="onRemoveBook" />
    </main>

    <div class="add-action container">
      <button v-if="isMobile" type="button" class="action button primary" @click="onCreateBook">
        Добавить книгу
      </button>
    </div>

    <BookEditModal ref="bookEditModal" />
    <BookFiltersModal ref="bookFiltersModal" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.book-page {
  position: relative;
  width: 100%;
  height: calc(100vh - 20px);
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
  overflow: auto;

  .content {
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: min-content 1fr;
    gap: 16px;
    min-height: 0;
    flex: 1;
    overflow: auto;

    @include tablet() {
      grid-template-columns: 1fr;
    }

    .sorts {
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 1;
      grid-column: span 2;
    }
  }

  .add-action {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    .action {
      width: 100%;
    }
  }
}
</style>
