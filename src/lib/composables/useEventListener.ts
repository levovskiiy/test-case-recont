import { toValue, watch, unref, type MaybeRefOrGetter, type MaybeRef } from 'vue'
import type { AnyFn, Nullable } from '../types'

type MaybeRefOrGetterEventListenerOptions = MaybeRefOrGetter<
  AddEventListenerOptions | boolean | undefined
>
type Listener<T, EVENT> = (this: T, event: EVENT) => any

interface InferEventListener<Event> {
  addEventListener(event: Event, fn?: any, args?: any): any
  removeEventListener(event: Event, fn?: any, args?: any): any
}

export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: MaybeRefOrGetter<E>,
  listener: MaybeRef<Listener<Window, WindowEventMap[E]>>,
  options?: MaybeRefOrGetterEventListenerOptions,
): AnyFn

export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: MaybeRefOrGetter<E>,
  listener: MaybeRef<Listener<Document, DocumentEventMap[E]>>,
  options?: MaybeRefOrGetterEventListenerOptions,
): AnyFn

export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<HTMLElement | Nullable>,
  event: MaybeRefOrGetter<E>,
  listener: MaybeRef<Listener<HTMLElement, HTMLElementEventMap[E]>>,
  options?: MaybeRefOrGetterEventListenerOptions,
): AnyFn

export function useEventListener<Name extends string, EventType = Event>(
  target: MaybeRefOrGetter<InferEventListener<EventType> | Nullable>,
  event: MaybeRefOrGetter<Name>,
  listener: MaybeRef<(e: EventType) => any>,
  options?: MaybeRefOrGetterEventListenerOptions,
): AnyFn

export function useEventListener(...args: Parameters<typeof useEventListener>) {
  let cleanup: any = () => {}
  const register = (
    target: EventTarget,
    event: string,
    listener: AnyFn,
    options: AddEventListenerOptions | boolean | undefined,
  ) => {
    target.addEventListener(event, listener, options)
    return () => target.removeEventListener(event, listener, options)
  }

  const stop = watch(
    () =>
      [
        toValue(args[0]) as any,
        toValue(args[1]) as string,
        unref(args[2]) as AnyFn,
        toValue(args[3]) as boolean | AddEventListenerOptions | undefined,
      ] as const,
    ([target, event, listener, options]) => {
      cleanup()

      if ([target, event, listener].some((x) => x == null)) {
        return
      }

      cleanup = register(target, event, listener, options)
    },
    { immediate: true, flush: 'post' },
  )

  const clear = () => {
    cleanup()
    stop()
  }

  return clear
}
