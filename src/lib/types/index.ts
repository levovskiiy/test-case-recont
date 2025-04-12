export type AnyFn<T = any> = (...args: T[]) => any
export type Nullable = null | undefined

export type Predicate<T> = (v: T) => boolean
