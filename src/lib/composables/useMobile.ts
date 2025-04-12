import { computed } from 'vue'
import { useMediaQuery } from './useMediaQuery'
import { MOBILE } from '../constants/breakpoints'

export function useMobile() {
  const matched = useMediaQuery(`(max-width: ${MOBILE}px)`)
  return computed(() => matched.value)
}
