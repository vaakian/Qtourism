import { } from 'react'

import './App.css'
import { AppRoutes } from './routes'
import { GlobalContextProvider, StateEditor } from './store'
import AppErrorBoundary from './middlewares/error'
import { AxiosProvider } from './services/http'

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <AxiosProvider>
          <AppErrorBoundary>
            <AppRoutes />
            <StateEditor />
          </AppErrorBoundary>
        </AxiosProvider>
      </GlobalContextProvider>
    </div>
  )
}

export default App
