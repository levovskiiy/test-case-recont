<script setup lang="ts">
import { IconEdit, IconTrash } from '@/lib/icons'

defineProps({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdYear: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

defineEmits(['remove', 'edit'])
</script>

<template>
  <div class="book-page-list-entitiy">
    <div class="header">
      <div class="text-leading">{{ name }}</div>
      <div class="actions">
        <button class="button no-border small" @click="$emit('edit')">
          <IconEdit />
        </button>
        <button class="button no-border small trash" @click="$emit('remove')">
          <IconTrash />
        </button>
      </div>
    </div>
    <div class="meta">
      <div class="text-base text-color-placeholder">{{ author }}</div>
      <div class="text-base text-color-placeholder">{{ createdYear }}</div>
      <div class="text-base text-color-placeholder">{{ category }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.book-page-list-entitiy {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  gap: 8px;
  border: 2px solid rgba(245, 246, 246, 1);
  border-radius: 16px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    background: rgba(245, 246, 246, 1);
  }

  .header {
    display: flex;
    align-items: center;

    .actions {
      margin-left: auto;

      .trash {
        &:hover {
          color: rgba(144, 11, 9, 1);
        }
      }
    }
  }

  .meta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;

    @include mobile() {
      gap: 8px;
    }
  }
}
</style>
