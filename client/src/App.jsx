import { } from 'react'

import './App.css'
import { AppRoutes } from './routes'
import { GlobalContextProvider, StateEditor } from './store'
import AppErrorBoundary from './middlewares/error'

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <AppErrorBoundary>
          <AppRoutes />
          <StateEditor />
        </AppErrorBoundary>
      </div>
    </GlobalContextProvider>
  )
}

export default App
