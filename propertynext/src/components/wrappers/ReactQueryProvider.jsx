'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProviderWrapper } from '../../context/AuthProviderWrapper'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

// Add this to your AppProviderWrapper.jsx
export function AppProvidersWrapper({ children }) {
  return (
    <AuthProviderWrapper>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </AuthProviderWrapper>
  )
}
