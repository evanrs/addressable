import { trim } from './trim'

export function isEqual<T extends Record<string, unknown>>(
  reference?: T,
  partial?: Partial<T>,
): partial is T {
  if (!reference || !partial) {
    return false
  }

  return Object.keys(reference).every((k) => {
    let a = reference[k]
    let b = partial[k] as string | undefined

    if (typeof a === 'string') a = trim(a)
    if (typeof b === 'string') b = trim(b)

    return a === b
  })
}

export function isNotEqual<T extends Record<string, unknown>>(reference?: T, partial?: Partial<T>) {
  return !isEqual(reference, partial)
}
