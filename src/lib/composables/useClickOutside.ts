import { toValue, type MaybeRefOrGetter } from 'vue'
import type { AnyFn } from '../types'
import { useEventListener } from './useEventListener'

export function useClickOutside(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  handler: AnyFn,
) {
  function listener(e: MouseEvent) {
    if (e.target == null) {
      return
    }

    const el = toValue(target)

    if (!el || el === e.target || e.composedPath().includes(el)) {
      return
    }

    handler(e)
  }

  let processingClick = false
  useEventListener(
    window,
    'click',
    (e) => {
      if (!processingClick) {
        processingClick = true
        setTimeout(() => {
          processingClick = false
        }, 0)

        listener(e)
      }
    },
    { passive: true },
  )
}
