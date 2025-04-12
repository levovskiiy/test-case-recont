<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { IconAddBook, IconSearch } from '@/lib/icons'
import { filters } from '../state/filters'
import { bookCount } from '../state/list'
import { BookPageSearchInput } from '.'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'add-book'): void
}>()

const visibleSearchField = ref(true)
const hideImage = ref(false)

const hasQuery = computed(() => (filters.search || '').length > 0)

const hintText = computed(() => {
  return hasQuery.value ? 'Книги по запросу' : 'Книги в каталоге'
})

const queryText = computed(() => {
  return !hasQuery.value ? bookCount : `«${filters.search}»`
})

function onSearch() {
  visibleSearchField.value = true
  hideImage.value = true
}

function onClear() {
  if (props.isMobile) {
    visibleSearchField.value = false
  }

  hideImage.value = false
}

watchEffect(() => {
  if (props.isMobile) {
    visibleSearchField.value = false
  } else {
    visibleSearchField.value = true
    hideImage.value = false
  }
})
</script>

<template>
  <header class="container book-page-header">
    <div class="search-book-field">
      <img v-show="!hideImage" src="/book.png" />
      <BookPageSearchInput v-show="visibleSearchField" v-model="filters.search" @clear="onClear" />
      <button
        v-show="isMobile && !visibleSearchField"
        type="button"
        class="button small no-border"
        @click="onSearch"
      >
        <IconSearch />
      </button>
    </div>
    <div class="book-count">
      <span class="text-heading">{{ hintText }}</span>
      <span class="text-heading text-color-placeholder">{{ queryText }}</span>
      <button
        v-if="!isMobile"
        type="button"
        class="add-book-action button primary"
        @click="emit('add-book')"
      >
        <IconAddBook />
        Добавить книгу
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.book-page-header {
  background: var(--foreground-color);
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .search-book-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
  }

  .book-count {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    .title {
      font-size: 20px;
      font-weight: 600;
    }

    .count {
      color: rgba(112, 119, 134, 1);
    }

    .add-book-action {
      margin-left: auto;
    }
  }
}
</style>
