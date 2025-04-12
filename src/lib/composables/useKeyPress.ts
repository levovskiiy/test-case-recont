import { useEventListener } from './useEventListener'

export function useKeyPress(keys: string[], handler: (e: KeyboardEvent) => any) {
  useEventListener(
    document,
    'keydown',
    (e: KeyboardEvent) => {
      if (keys.includes(e.code)) {
        handler(e)
      }
    },
    true,
  )
}
