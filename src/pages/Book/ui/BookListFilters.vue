<script setup lang="ts">
import { computed } from 'vue'
import { allAuthors, allGenres, allYears } from '../state/list'
import { FilterList } from '.'

const props = defineProps({
  genres: {
    type: Array,
    default: () => [],
  },
  years: {
    type: Array,
    default: () => [],
  },
  authors: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:genres', 'update:years', 'update:authors'])

const genresModel = computed({
  get() {
    return props.genres
  },
  set(v) {
    emit('update:genres', v.slice())
  },
})

const yearsModel = computed({
  get() {
    return props.years
  },
  set(v) {
    emit('update:years', v.slice())
  },
})

const authorsModel = computed({
  get() {
    return props.authors
  },
  set(v) {
    emit('update:authors', v.slice())
  },
})
</script>

<template>
  <div class="book-list-filters">
    <FilterList v-model="genresModel" title="Жанры" :items="allGenres" />
    <FilterList v-model="yearsModel" title="Год" :items="allYears" />
    <FilterList v-model="authorsModel" title="Авторы" :items="allAuthors" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.book-list-filters {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
}
</style>
