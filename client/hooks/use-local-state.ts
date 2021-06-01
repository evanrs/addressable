import { useCallback, useEffect, useMemo } from 'react'
import { Storage } from '../tools'

export function useLocalState<T>(key: string, defaultValue?: T): [T | undefined, (v: T) => void] {
  const storage = useMemo(() => Storage<T>(key), [key])
  const value = useMemo(() => storage.get(), [storage]) ?? defaultValue
  const setValue = useCallback(
    (update: T) => {
      storage.set(undefined, update)
    },
    [storage],
  )
  // clear on unmount
  useEffect(() => () => storage.remove(), [])
  // … because it's local state, not local storage
  return [value, setValue]
}
