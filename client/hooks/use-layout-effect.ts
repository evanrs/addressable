import { useEffect, useLayoutEffect } from 'react'
export { useIsomorphicLayoutEffect as useLayoutEffect }

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
