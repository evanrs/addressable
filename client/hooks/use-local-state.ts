import { useCallback, useEffect, useMemo, useState } from 'react'
import { Storage } from '../tools'

export function useLocalState<T>(key: string, defaultValue?: T): [T | undefined, (v: T) => void] {
  const storage = useMemo(() => Storage<T>(key), [key])
  const value = useMemo(() => storage.get(), [storage]) ?? defaultValue
  const [state, setState] = useState<T | undefined>(value)
  // if our key changes, our value does
  useEffect(() => state && setState(value), [value])
  // update on state change
  useEffect(() => state && storage.set(undefined, state), [storage, state])
  // clear on unmount
  useEffect(() => () => storage.remove(), [storage])
  // … because it's local state, not local storage
  return [state ?? value, setState]
}
