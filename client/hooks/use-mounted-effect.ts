import { useEffect, DependencyList } from 'react'
import { useLayoutEffect } from './use-layout-effect'

export function useMountedEffect(
  effect: (isMounted: () => boolean) => unknown | (() => void),
  dependencies?: DependencyList,
) {
  useEffect(() => {
    let mounted = true
    const destructor = effect(() => mounted)
    // TODO only return unmount when destructor not undefined?
    return () => {
      mounted = false
      if (typeof destructor === 'function') destructor()
    }
  }, dependencies)
}

export function useMountedLayoutEffect(
  effect: (isMounted: () => boolean) => unknown | (() => void),
  dependencies?: DependencyList,
) {
  useLayoutEffect(() => {
    let mounted = true
    const destructor = effect(() => mounted)
    // TODO only return unmount when destructor not undefined?
    return () => {
      mounted = false
      if (typeof destructor === 'function') destructor()
    }
  }, dependencies)
}
