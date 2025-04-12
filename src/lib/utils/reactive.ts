import { toRaw } from 'vue'

export function cloneMaybeReactive<T extends object>(v: T) {
  return structuredClone(toRaw(v))
}
