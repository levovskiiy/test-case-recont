import { ref, watch } from 'vue'

export function useLocalStorage<T extends string | object | number | boolean>(
  key: string,
  initialValue?: T,
) {
  const state = ref<T>(get())

  function get() {
    const fromStorage = localStorage.getItem(key)

    if (!fromStorage) {
      return initialValue
    }

    return JSON.parse(fromStorage)
  }

  function set(value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  watch(
    state,
    (data) => {
      if (data == null) {
        localStorage.removeItem(key)
      } else {
        set(data)
      }
    },
    {
      deep: true,
    },
  )

  return state
}
