import type { Book, BookWithouID } from '@/entities/book'
import { reactive } from 'vue'
import { SORT_COMPARE_SCHEMA, SORT_SCHEMA, type Sorts } from './schema'
import { objectMap } from '@/lib/utils/object'

export type SortOrder = 'asc' | 'desc'

export const DEFAULT_SORT = objectMap(SORT_SCHEMA, (k, v) => [k, v.default])

export const sort = reactive<Sorts>(structuredClone(DEFAULT_SORT))

export const sortColumnSelectOptions = Object.freeze<{ id: keyof BookWithouID; title: string }[]>([
  { id: 'name', title: 'По имени' },
  { id: 'year', title: 'По году' },
  { id: 'author', title: 'По автору' },
  { id: 'genre', title: 'По жанру' },
])

export const sortOrderSelectOptions = Object.freeze<{ id: SortOrder; title: string }[]>([
  { id: 'asc', title: 'По возрастанию' },
  { id: 'desc', title: 'По убыванию' },
])

export function appySort(items: Book[]) {
  const { sortColumn, sortOrder } = sort
  if (sortColumn == null || sortOrder == null) {
    return items
  }

  return items.slice().sort((a, b) => {
    const compare = SORT_COMPARE_SCHEMA[sortColumn!].compare
    const aCol = a[sortColumn!]
    const bCol = b[sortColumn!]

    return sortOrder === 'asc' ? compare(aCol, bCol) : compare(bCol, aCol)
  })
}
