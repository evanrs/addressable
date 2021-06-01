import { useRef } from 'react'
import { useLayoutEffect } from './use-layout-effect'

export function useAutoFocus(autoFocus?: boolean | undefined) {
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
      const timeout = setTimeout(() => inputRef.current?.focus(), 300)
      return () => clearTimeout(timeout)
    }
  }, [autoFocus])

  return { ref: inputRef, autoFocus }
}
