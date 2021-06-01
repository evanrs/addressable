import { FocusEventHandler, useCallback, useState } from 'react'

type UseFocusStateProps<T> = {
  onFocus?: FocusEventHandler<T>
  onBlur?: FocusEventHandler<T>
}
export function useFocusState<T = HTMLInputElement>(handlers?: UseFocusStateProps<T>) {
  const [focused, setFocused] = useState(false)

  const onFocus = useCallback<FocusEventHandler<T>>(
    (event) => {
      setFocused(true)
      return handlers?.onFocus?.(event)
    },
    [handlers?.onFocus],
  )
  const onBlur = useCallback<FocusEventHandler<T>>(
    (event) => {
      setFocused(false)
      return handlers?.onBlur?.(event)
    },
    [handlers?.onBlur],
  )

  return [focused, { onFocus, onBlur }]
}
