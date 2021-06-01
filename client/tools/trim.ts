export function trimRecord<T extends Record<string, string>>(values: T): T {
  const acc = {} as any
  for (const k of Object.keys(values)) {
    acc[k] = trim(values[k]) ?? values[k]
  }
  return acc as T
}

export function trim(v?: unknown) {
  return typeof v === 'string' ? v.replace(/(^\s+)|(\s+$)/g, '') : v
}
