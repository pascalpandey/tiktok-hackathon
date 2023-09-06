'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Next13ProgressBar } from 'next13-progressbar'

const queryClient = new QueryClient()

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Next13ProgressBar color="#FE2C55" options={{showSpinner:false}}/>
      {children}  
    </QueryClientProvider>
  )
}

export default Providers