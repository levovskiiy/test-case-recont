import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import Dialog from '../src/Dialog.vue'
import { nextTick, ref } from 'vue'

describe('Dialog', () => {
  const params = {
    global: {
      stubs: {
        teleport: true,
      },
    },
  }
  test('Открывает и закрывает диалоговое окно при изменении visible', async () => {
    const visible = ref(false)

    const wrapper = mount(() => <Dialog visible={visible.value} />, params)

    visible.value = true
    await nextTick()
    expect(wrapper.find('.dialog-viewport').isVisible()).toBe(true)

    visible.value = false
    await nextTick()
    expect(wrapper.find('.dialog-viewport').isVisible()).toBe(false)
  })
  test('При закрытии испускает событие close', async () => {
    const onClose = vi.fn()

    const visible = ref(true)
    const wrapper = mount(() => <Dialog visible={visible.value} onClose={onClose} />, params)

    await wrapper.find('.close').trigger('click')

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
