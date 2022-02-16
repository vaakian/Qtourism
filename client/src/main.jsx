import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
  // config
  defaultOptions: {
    queries: {
      retry: 1,
      refetchInterval: false,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 30,
      cacheTime: 1000 * 30
    },
    mutations: {
      retry: 1,
    }
  }
})
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
