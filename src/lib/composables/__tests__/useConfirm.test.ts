import { describe, expect, test } from 'vitest'
import { useConfirmDialog } from '../useConfirmDialog'
import { nextTick } from 'vue'

describe('useConfirmDialog', () => {
  test('Должен открывать диалоговое окно и закрывать при подтверждении', () => {
    const { open, confirm, opened } = useConfirmDialog()

    open()
    expect(opened.value).toBe(true)

    confirm()
    expect(opened.value).toBe(false)
  })
  test('Должен возвращать промис который резолвится при вызове confirm()', async () => {
    const { open, confirm } = useConfirmDialog<boolean, null>()

    setTimeout(() => {
      confirm(true)
    }, 1)

    const { data, canceled } = await open()

    await nextTick()

    expect(data).toBe(true)
    expect(canceled).toBe(false)
  })
  test('Должен возвращать промис который резолвится при вызове cancel()', async () => {
    const { open, cancel } = useConfirmDialog<boolean, boolean>()

    setTimeout(() => {
      cancel(false)
    }, 1)

    const { data, canceled } = await open()

    await nextTick()

    expect(data).toBe(false)
    expect(canceled).toBe(true)
  })
})
