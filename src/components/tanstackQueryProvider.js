'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

const TanstackQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}  
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider