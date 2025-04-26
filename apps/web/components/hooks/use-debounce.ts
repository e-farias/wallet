import { useCallback, useRef } from 'react'

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay = 1500
) => {

  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const debouncedFunction = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return { debouncedFunction, cancel }
}
