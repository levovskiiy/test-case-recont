import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { defineComponent } from 'vue'

import { useMount } from '../useMount'

describe('useMount', () => {
  test('Должен вызывать переданную функцию при маунте и возвращаемую при уничтожении компонента', async () => {
    const clear = vi.fn()
    const fn = vi.fn()

    const dummy = defineComponent({
      setup() {
        useMount(() => {
          fn()
          return () => clear()
        })

        return () => <div>test</div>
      },
    })

    const wrapper = mount(dummy)
    expect(fn).toHaveBeenCalled()
    wrapper.unmount()
    expect(clear).toHaveBeenCalled()
  })
})
