import Button from '../src/Button.vue'
import { mount } from '@vue/test-utils'
import { test, describe, expect, vi } from 'vitest'

describe('Button', () => {
  test('Испускает событие при клике', async () => {
    const clickFn = vi.fn()
    const wrapper = mount(() => <Button disabled={false} onClick={clickFn} />)

    await wrapper.trigger('click')
    expect(clickFn).toHaveBeenCalled()
    const args = clickFn.mock.calls[0]

    expect(args).toHaveLength(1)
    expect(args[0]).toBeInstanceOf(MouseEvent)
  })
  describe('Состояние блокировки', () => {
    test('Установлен класс и атрибут disabled', () => {
      const wrapper = mount(() => <Button disabled={true} />)

      expect(wrapper.classes()).toContain('disabled')
      expect(wrapper.attributes().disabled).toBeDefined()
    })
    test('Не испускает событие при клике', async () => {
      const clickFn = vi.fn()
      const wrapper = mount(() => <Button disabled={true} onClick={clickFn} />)

      await wrapper.trigger('click')
      expect(clickFn).not.toHaveBeenCalled()
    })
  })
})
