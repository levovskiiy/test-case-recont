import type { Book } from '@/entities/book'
import { useLocalStorage } from '@/lib/composables'
import { computed } from 'vue'
import { filterBooks } from './filters'
import { appySort } from './sort'

const _books = useLocalStorage<Book[]>('books', [])

export const books = computed(() => {
  return appySort(filterBooks(_books.value))
})

export const allGenres = computed(() => {
  if (_books.value.length === 0) {
    return []
  }

  return _books.value.map((it) => ({
    id: it.genre,
    title: it.genre,
  }))
})

export const allYears = computed(() => {
  return _books.value.map((it) => ({
    id: it.year,
    title: it.year,
  }))
})

export const allAuthors = computed(() => {
  return _books.value.map((it) => ({
    id: it.author,
    title: it.author,
  }))
})

export const bookCount = computed(() => books.value.length)

export function addBook(book: Book) {
  _books.value.push(book)
}

export function removeBook(bookId: string) {
  const idx = _books.value.findIndex((v) => v.id === bookId)
  if (idx) {
    _books.value.splice(idx, 1)
  }
}

export function editBook(book: Book, index: number) {
  const item = books.value[index]
  Object.assign(item, book)
}
