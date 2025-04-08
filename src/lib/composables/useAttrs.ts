import { computed, getCurrentInstance, toValue, type MaybeRefOrGetter } from 'vue'

const EXCLUDED_ATTRS = new Set(['class', 'style'])
const LISTENER_REGXP = /^on-[A-Z]/

export type UseAttrsOptions = {
  excludeListeners?: MaybeRefOrGetter<boolean>
  excludeKeys?: MaybeRefOrGetter<Set<string>>
}

/**
 * Получить атрибуты за исключением указанных
 */
export function useAttrs(options: UseAttrsOptions = {}) {
  const { excludeListeners = false, excludeKeys = EXCLUDED_ATTRS } = options
  const instance = getCurrentInstance()

  if (!instance) {
    console.debug(`useAttrs() using only in component`)
    return computed(() => ({}))
  }

  return computed(() => {
    const attrEntries = Object.entries(instance.proxy?.$attrs || {})
    const filtered = attrEntries.filter(([key]) => {
      return (
        !toValue(excludeKeys).has(key) && !(toValue(excludeListeners) && LISTENER_REGXP.test(key))
      )
    })

    return Object.fromEntries(filtered)
  })
}
