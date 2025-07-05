'use client'
import { useState, useEffect } from 'react'

// Hook to prevent hydration issues by only rendering on client
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

// Hook to get window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
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
  }, [])

  return windowSize
}

// Hook to get scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    // Set initial position
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
