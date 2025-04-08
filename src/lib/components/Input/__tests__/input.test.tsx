import Input from '../src/Input.vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { nextTick, ref } from 'vue'

describe('input', () => {
  test('Обновляет переданное состояние ввода', async () => {
    const value = ref('test')

    const wrapper = mount(() => <Input v-model={value.value} />)

    const input = wrapper.find('input')
    expect(input.element.value).toMatchSnapshot('test')

    value.value = '1'
    await nextTick()
    expect(input.element.value).toMatchSnapshot('1')

    wrapper.vm.$emit('update:model-value', '123')
    await nextTick()
    expect(value.value).toMatchSnapshot('123')
  })

  describe('Input events', () => {
    const focus = vi.fn()
    const blur = vi.fn()

    test('focus event', async () => {
      const wrapper = mount(() => <Input onFocus={focus} />)

      const input = wrapper.find('input')
      await input.trigger('focus')
      expect(focus).toHaveBeenCalled()
    })

    test('blur event', async () => {
      const wrapper = mount(() => <Input onBlur={blur} />)

      const input = wrapper.find('input')
      await input.trigger('blur')
      expect(blur).toHaveBeenCalled()
    })
  })
})
