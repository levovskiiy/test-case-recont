import { objectMap } from '@/lib/utils/object'
import { computed, reactive } from 'vue'
import { FILTER_SCHEMA, type Filters } from './schema'
import type { Book, BookWithouID } from '@/entities/book'
import { combine } from '@/lib/utils'

export const DEFAULT_FILTERS = objectMap(FILTER_SCHEMA, (k, v) => [k, v.default as any])

export const filters = reactive<Filters>(structuredClone(DEFAULT_FILTERS))

export function filterByQuery(b: Book): boolean {
  return ((b as any)[filters.searchColumn] as string)
    .toLowerCase()
    .includes(filters.search?.toLocaleLowerCase() || '')
}

function filterByAuthor(b: Book) {
  return filters.authors.includes(b.author)
}

function filterByGenre(b: Book) {
  if (b.genre == null) {
    return false
  }

  return filters.genres.includes(b.genre)
}

function filterByYear(b: Book) {
  return filters.years.includes(b.year)
}

export const selectedFilters = computed(() => {
  const entries = [
    [filters.authors, filterByAuthor],
    [filters.genres, filterByGenre],
    [filters.years, filterByYear],
  ] as const

  const res = entries.filter((x) => x[0].length > 0).map((x) => x[1])
  return res
})

export const filterBooks = (books: Book[]) =>
  books.filter(combine(filterByQuery, ...selectedFilters.value))

export const columnSelectOptions = Object.freeze<{ id: keyof BookWithouID; title: string }[]>([
  { id: 'author', title: 'По автору' },
  { id: 'genre', title: 'По жанру' },
  { id: 'name', title: 'По имени' },
  { id: 'year', title: 'По году' },
])
