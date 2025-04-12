import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  FILTER_SCHEMA,
  SORT_SCHEMA,
  type Filters,
  type FilterSchema,
  type Sorts,
  type SortSchema,
} from './schema'
import { sort } from './sort'
import { filters } from './filters'
import { objectEntries } from '@/lib/utils'

type S = SortSchema & FilterSchema

type QueryState = Partial<{ [x in keyof S]: string }>

const query = reactive<QueryState>({})

let setuped = false
export function setupQuery() {
  if (setuped) {
    return
  }

  setuped = true

  const route = useRoute()
  const router = useRouter()

  Object.assign(query, parseRouteQuery(location.search.substring(1)))
  shareQueryState(query)

  watch(
    query,
    () => {
      const params = new URLSearchParams(stringifyState(query))
      router.push({ path: route.path, query: Object.fromEntries(params.entries()) })
    },
    { deep: true, flush: 'post' },
  )

  watch(
    () => route.query,
    () => {
      Object.assign(query, parseRouteQuery(location.search.substring(1)))
    },
  )

  watch(
    () => [sort, filters],
    () => {
      sortToQuery(sort)
      filtersToQuery(filters)
    },
    {
      deep: true,
    },
  )
}

function sortToQuery(sort: Sorts) {
  for (const [key, config] of objectEntries(SORT_SCHEMA)) {
    const value = sort[key]
    let serialized: any | undefined

    if (config.type === String) {
      serialized = String(value)
    }

    if (query[key] !== serialized) {
      ;(query as any)[key] = serialized
    }
  }
}

function filtersToQuery(filters: Filters) {
  for (const [key, config] of objectEntries(FILTER_SCHEMA)) {
    const value = filters[key]

    let serialzed: undefined | any

    if (config.type === Array) {
      serialzed = (value as any)?.join(',')
    }

    if (config.type === String) {
      serialzed = String(value)
    }

    if (query[key] !== serialzed) {
      ;(query as any)[key] = serialzed
    }
  }
}

function stringifyState(v: QueryState) {
  const entries = Object.entries(v)
  return entries
    .map((e) => [toKebab(e[0]), Array.isArray(e[1]) ? e[1].join('+') : e[1]])
    .filter((e) => !!e[1]) as [string, string][]
}

function toKebab(v: string) {
  return v.replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}-${b.toLowerCase()}`)
}

function toCamel(v: string) {
  return v.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())
}

function parseRouteQuery(query: string) {
  return Object.fromEntries(
    Array.from(new URLSearchParams(query).entries())
      .map((e) => [toCamel(e[0]), e[1]])
      .filter((e) => !!e[1]),
  )
}

function assignQueryToSort(query: QueryState, sort: Sorts) {
  for (const [key, config] of objectEntries(SORT_SCHEMA)) {
    const value = query[key]

    const resolved = !value ? structuredClone(config.default) : String(value)

    if (resolved) {
      ;(sort as any)[key] = resolved
    }
  }
}

function assignQueryToFilters(query: QueryState, filters: Filters) {
  for (const [key, config] of objectEntries(FILTER_SCHEMA)) {
    const value = query[key]

    let resolved: any | undefined
    if (!value) {
      resolved = structuredClone(config.default)
    } else if (config.type === Array) {
      resolved = value.split(/[,+]/)
    } else {
      resolved = value
    }

    if (resolved) {
      ;(filters as any)[key] = resolved
    }
  }
}

function shareQueryState(state: QueryState) {
  assignQueryToSort(state, sort)
  assignQueryToFilters(state, filters)
}
