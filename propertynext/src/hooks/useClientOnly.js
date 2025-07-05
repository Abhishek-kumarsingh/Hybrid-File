'use client'
import { useEffect, useState } from 'react'

/**
 * Custom hook to handle client-side only operations
 * Prevents hydration mismatches by ensuring code only runs on client
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Custom hook for window dimensions that prevents hydration issues
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const isClient = useClientOnly()

  useEffect(() => {
    if (!isClient) return

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  return windowSize
}

/**
 * Custom hook for scroll position that prevents hydration issues
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const isClient = useClientOnly()

  useEffect(() => {
    if (!isClient) return

    function handleScroll() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  return scrollY
}
