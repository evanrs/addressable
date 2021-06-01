export const guardFor = <T>(
  predicate: boolean | ((state: T | unknown) => boolean) = Boolean,
  state?: T | unknown,
) => {
  const condition = typeof predicate === 'function' && state != null && predicate(state)
  return (value: T | unknown): value is T => {
    return state != null
      ? condition && value === state
      : typeof predicate === 'function'
      ? predicate(value)
      : predicate
  }
}
