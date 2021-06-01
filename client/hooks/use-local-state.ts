import { useEffect, useMemo, useState } from 'react'
import { Storage } from '../tools'

const flag = Symbol()

function isValue<T>(value: unknown): value is T {
  return value !== flag
}

export function useLocalState<T>(key: string, defaultValue?: T) {
  const storage = useMemo(() => Storage<T>(key), [key])
  const [state, setState] = useState<T | symbol | undefined>(
    useMemo(() => storage.get() ?? defaultValue ?? flag, []),
  )
  // initialize from local storage
  useEffect(() => {
    setState(storage.get() ?? flag)
    // clean up on unmounts
    return () => storage.remove()
  }, [storage])
  // update on state change
  useEffect(() => {
    if (isValue<T>(state)) storage.set(undefined, state)
  }, [storage, state])

  // … because it's local state, not local storage
  return [isValue(state) ? state : undefined, setState] as [T | undefined, typeof setState]
}
