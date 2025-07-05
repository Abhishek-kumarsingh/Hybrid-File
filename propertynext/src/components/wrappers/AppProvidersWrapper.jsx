'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'
import dynamic from 'next/dynamic'
const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})
import { NotificationProvider } from '@/context/useNotificationContext'
const AppProvidersWrapper = ({ children }) => {
  const handleChangeTitle = () => {
    if (document.visibilityState == 'hidden') document.title = 'Visit Again'
    else document.title = DEFAULT_PAGE_TITLE
  }
  useEffect(() => {
    if (document) {
      const splashElement = document.querySelector('#splash-screen')
      const nextSplashElement = document.querySelector('#__next_splash')

      // Check if content is already loaded
      if (nextSplashElement?.hasChildNodes()) {
        splashElement?.classList.add('remove')
      }

      // Use MutationObserver instead of deprecated DOMNodeInserted
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            splashElement?.classList.add('remove')
            observer.disconnect() // Stop observing once we've added the class
          }
        })
      })

      // Start observing
      if (nextSplashElement) {
        observer.observe(nextSplashElement, {
          childList: true,
          subtree: true,
        })
      }

      // Cleanup function
      const cleanup = () => {
        observer.disconnect()
      }

      // Set a timeout as fallback to remove splash screen
      const fallbackTimeout = setTimeout(() => {
        splashElement?.classList.add('remove')
        cleanup()
      }, 3000)

      document.addEventListener('visibilitychange', handleChangeTitle)

      return () => {
        document.removeEventListener('visibilitychange', handleChangeTitle)
        clearTimeout(fallbackTimeout)
        cleanup()
      }
    }
  }, [])
  return (
    <SessionProvider>
      <LayoutProvider>
        <NotificationProvider>
          {children}
          <ToastContainer theme="colored" />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </NotificationProvider>
      </LayoutProvider>
    </SessionProvider>
  )
}
export default AppProvidersWrapper
