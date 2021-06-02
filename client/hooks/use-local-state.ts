import { useEffect, useMemo, useState } from 'react'
import { Storage } from '../tools'

const flag = Symbol()

function isValue<T>(value: unknown): value is T {
  return value !== flag
}

export function useLocalState<T>(key: string, defaultValue?: T) {
  const storage = useMemo(() => Storage<T>(key), [key])
  const initial = useMemo(() => storage.get() ?? defaultValue ?? flag, [storage])
  const [state, setState] = useState<T | symbol | undefined>(initial)

  // initialize from local storage
  useEffect(() => {
    setState(initial)
    // clean up on unmounts
    return () => storage.remove()
  }, [initial])

  // update on state change
  useEffect(() => {
    if (isValue<T>(state)) storage.set(undefined, state)
  }, [storage, state])

  // … because it's local state, not local storage
  return [isValue(state) ? state : undefined, setState] as [T | undefined, typeof setState]
}
