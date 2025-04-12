import type { Predicate } from '../types'

export function anyOf<T>(...args: Predicate<T>[]): Predicate<T> {
  if (args.length === 0) {
    return () => true
  }

  return (el) => {
    return args.some((filter) => filter(el))
  }
}

export function combine<T>(...args: Predicate<T>[]): Predicate<T> {
  if (args.length === 0) {
    return () => false
  }

  return (a) => {
    for (const filter of args) {
      const ret = filter(a)
      if (!ret) return false
    }
    return true
  }
}
