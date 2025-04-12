export function objectMap<
  K extends string,
  V,
  NewKey extends string | number | symbol = K,
  NewValue = V,
>(
  o: Record<K, V>,
  mapper: (key: K, value: V) => [NewKey, NewValue] | undefined,
): Record<NewKey, NewValue> {
  return Object.fromEntries(
    Object.entries(o)
      .map(([k, v]) => mapper(k as K, v as V))
      .filter((v) => v != null),
  ) as Record<NewKey, NewValue>
}

export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
