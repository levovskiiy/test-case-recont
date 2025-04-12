import type { AnyFn, Nullable } from '@/lib/types'
import { compareString } from '@/lib/utils'

export type SchemaValue<T, D> = {
  type: T
  default: D
}

export type FilterSchema = {
  search: SchemaValue<StringConstructor, string | Nullable>
  searchColumn: SchemaValue<StringConstructor, string>
  years: SchemaValue<ArrayConstructor, string[]>
  genres: SchemaValue<ArrayConstructor, string[]>
  authors: SchemaValue<ArrayConstructor, string[]>
}

export const FILTER_SCHEMA = Object.freeze<FilterSchema>({
  search: {
    type: String,
    default: '',
  },
  searchColumn: {
    type: String,
    default: 'name',
  },
  years: {
    type: Array,
    default: [],
  },
  genres: {
    type: Array,
    default: [],
  },
  authors: {
    type: Array,
    default: [],
  },
})

export type SortSchema = {
  sortColumn: SchemaValue<StringConstructor, string | Nullable>
  sortOrder: SchemaValue<StringConstructor, string | Nullable>
}

export const SORT_SCHEMA = Object.freeze<SortSchema>({
  sortColumn: {
    type: String,
    default: 'name',
  },
  sortOrder: {
    type: String,
    default: 'asc',
  },
})

export const SORT_COMPARE_SCHEMA = Object.freeze<Record<string, { compare: AnyFn }>>({
  author: {
    compare: compareString,
  },
  genre: {
    compare: compareString,
  },
  year: {
    compare: (a, b) => {
      const aDate = new Date(a)
      const bDate = new Date(b)

      return Math.sign(aDate.getFullYear() - bDate.getFullYear())
    },
  },
  name: {
    compare: compareString,
  },
})

export type Filters = {
  [x in keyof FilterSchema]: FilterSchema[x]['default']
}

export type Sorts = {
  [x in keyof SortSchema]: SortSchema[x]['default']
}
