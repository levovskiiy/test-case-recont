import { beforeEach, describe, expect, test } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'
import { nextTick } from 'vue'

describe('useLocalStorage', () => {
  const key = 'use-local-storage-test'

  beforeEach(() => {
    localStorage.clear()
  })

  test('Возвращает значение из Local storage', () => {
    const value = 'Hello!'
    localStorage.setItem(key, JSON.stringify(value))

    const state = useLocalStorage(key)
    expect(state.value).toBe(value)
  })
  test('Возвращает значение по умолчанию если в хранилище нет значения по указанному ключу', () => {
    const state = useLocalStorage(key, 'default')
    expect(state.value).toBe('default')
  })
  test('реактивное обновление значения в localStorage', async () => {
    const state = useLocalStorage(key)

    state.value = 'value'
    await nextTick()
    expect(localStorage.getItem(key)).toBe(JSON.stringify(state.value))
  })
  test('Удаляет ключ если установлено неопределенное значение', async () => {
    const state = useLocalStorage(key, 'default') as any
    state.value = null
    await nextTick()
    expect(localStorage.getItem(key)).toBeNull()
  })
})
