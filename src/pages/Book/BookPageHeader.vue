<script lang="ts" setup>
import { Input } from '@/lib/components'

const count = 0

const emit = defineEmits<{
  (e: 'add-book'): void
}>()
</script>

<template>
  <header class="book-page-header">
    <div class="container">
      <div class="search-book-field">
        <img src="/book.png" />
        <Input class="search" placeholder="Найти ту самую книгу" />
      </div>
      <div class="book-count">
        <span class="title">Книги в каталоге</span>
        <span class="count">{{ count }}</span>
        <button class="add-book-action" @click="emit('add-book')">Добавить книгу</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.book-page-header {
  background: var(--foreground-color);
  padding: 16px 0;

  .container {
    display: flex;
    flex-flow: column nowrap;
    gap: 16px;
  }

  .search-book-field {
    display: flex;
    align-items: center;
    gap: 25px;

    :deep(.search) {
      background: rgba(255, 255, 255, 1);
    }
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
