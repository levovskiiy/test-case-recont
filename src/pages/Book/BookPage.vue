<script lang="ts" setup>
import { ref } from 'vue'
import BookPageHeader from './BookPageHeader.vue'
import BookPageList from './BookPageList.vue'

const filters = ref({
  query: '',
})
</script>

<template>
  <div class="book-page">
    <BookPageHeader />
    <BookPageList />
  </div>
</template>

<style lang="scss" scoped>
.book-page {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 20px;
}
</style>
