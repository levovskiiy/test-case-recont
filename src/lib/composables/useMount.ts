import { onMounted, onScopeDispose } from 'vue'
import type { AnyFn } from '../types'

export function useMount(fn: AnyFn) {
  let clear = () => {}

  onMounted(() => {
    clear = fn()
  })

  onScopeDispose(() => clear())
}
