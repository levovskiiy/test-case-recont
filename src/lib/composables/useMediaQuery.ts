import { computed, ref, shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { useEventListener } from './useEventListener'

export function useMediaQuery(query: MaybeRefOrGetter<string>) {
  const mediaQuery = shallowRef<MediaQueryList>()
  const matches = ref(false)

  watchEffect(() => {
    mediaQuery.value = window.matchMedia(toValue(query))
    matches.value = mediaQuery.value.matches
  })

  const changeHandler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  useEventListener(mediaQuery, 'change', changeHandler, { passive: true })

  return computed(() => matches.value)
}
