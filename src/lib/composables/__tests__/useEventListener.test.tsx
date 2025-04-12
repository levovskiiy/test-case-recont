import { describe, expect, test, vi, type MockInstance } from 'vitest'
import { useEventListener } from '../useEventListener'
import { beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'

describe('useEventListener', () => {
  let target: HTMLDivElement
  let removeFn: MockInstance
  let addFn: MockInstance

  beforeEach(() => {
    target = document.createElement('div')
    removeFn = vi.spyOn(target, 'removeEventListener')
    addFn = vi.spyOn(target, 'addEventListener')
  })

  test('Должен устанавливать обрабаотчик на элемент и очищать при уничтожении компонента', async () => {
    const listener = vi.fn()
    const stop = useEventListener(target, 'click', listener)

    expect(addFn).toHaveBeenCalled()
    stop()
    expect(removeFn).toHaveBeenCalled()
  })
  test('Должен триггерить переданный обработчик', () => {
    const listener = vi.fn()
    const stop = useEventListener(target, 'click', listener)

    target.click()
    expect(listener).toHaveBeenCalled()
    stop()
  })
  test('Не устанавливает обработчик пока ссылка на элмент, обработчик, событие не определены', async () => {
    const el = ref()
    const listener = ref()
    const event = ref()

    useEventListener(el, event, listener)
    expect(addFn).not.toHaveBeenCalled()

    el.value = target
    await nextTick()
    expect(addFn).not.toHaveBeenCalled()

    listener.value = vi.fn()
    await nextTick()
    expect(addFn).not.toHaveBeenCalled()

    event.value = 'click'
    await nextTick()
    expect(addFn).toHaveBeenCalled()
  })
  test('Должен реагировать на измение ссылки на элемент, событие, опции', async () => {
    const el2 = document.createElement('div')
    const addEl2Spy = vi.spyOn(el2, 'addEventListener')
    const removeEl2Spy = vi.spyOn(el2, 'removeEventListener')
    const el1 = target

    const _el = ref(el1)
    const listener = vi.fn()
    const event = ref('click')
    const opts = ref(false)

    useEventListener(_el, event, listener, opts)
    event.value = 'mousedown'
    await nextTick()
    expect(addFn).toHaveBeenCalledTimes(2)
    expect(removeFn).toHaveBeenCalledTimes(1)

    _el.value = el2
    await nextTick()
    expect(removeFn).toHaveBeenCalledTimes(2)
    expect(addEl2Spy).toHaveBeenCalledTimes(1)

    opts.value = true
    await nextTick()
    expect(addEl2Spy).toHaveBeenCalledTimes(2)
    expect(removeEl2Spy).toHaveBeenCalledTimes(1)
  })
})
