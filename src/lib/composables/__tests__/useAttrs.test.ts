import { expect, test, describe } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { useAttrs, type UseAttrsOptions } from '../useAttrs'

describe('useAttrs', () => {
  let wrapper: VueWrapper<any>

  const componentFactory = (attrs: any = {}, composableOptions: UseAttrsOptions = {}) => {
    const cmp = defineComponent({
      inheritAttrs: false,
      setup() {
        const attrs = useAttrs(composableOptions)
        return { attrs }
      },
      render: () => h('div'),
    })

    wrapper = mount(cmp, {
      attrs: attrs,
    })
  }

  test('Должен исключать только стили и классы по умолчанию', () => {
    componentFactory({
      class: 'test',
      style: {
        color: 'red',
      },
      test: 'test',
    })

    expect(wrapper.vm.attrs['class']).not.toBeDefined()
    expect(wrapper.vm.attrs['style']).not.toBeDefined()
    expect(wrapper.vm.attrs['test']).toBeDefined()
  })

  test('Должен исключать переданные атрибуты', () => {
    componentFactory({ testAttr: 'test' }, { excludeKeys: new Set(['testAttr']) })
    expect(wrapper.vm.attrs).toStrictEqual({})
  })

  test('Исключает слушателей событий при установки данной опции', () => {
    componentFactory({ 'on-Click': () => {} }, { excludeListeners: true })
    expect(wrapper.vm.attrs['on-Click']).not.toBeDefined()
  })
})
