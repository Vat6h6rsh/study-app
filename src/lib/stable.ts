import { useCallback, useRef } from 'react'

// A callback with a permanent identity that always runs the latest closure: lets memoised children
// skip renders without ever calling a stale handler.
export function useStable<A extends unknown[], R>(fn: (...args: A) => R) {
  const ref = useRef(fn)
  ref.current = fn
  return useCallback((...args: A) => ref.current(...args), [])
}
