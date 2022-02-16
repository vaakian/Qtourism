import { } from 'react'
import './App.css'
import { AppRoutes } from './routes'
import { GlobalContextProvider, StateEditor } from './store'
import AppErrorBoundary from './middlewares/error'
import { AxiosProvider } from './services/http'
import Nav from './components/Nav'
function App() {
  return (
    <div className="App">
      <Nav />
      <AppMainContent />
    </div>
  )
}

const AppMainContent = () => {
  return (
    <GlobalContextProvider>
      <AxiosProvider>
        <AppErrorBoundary>
          <AppRoutes />
          {/* <StateEditor /> */}
        </AppErrorBoundary>
      </AxiosProvider>
    </GlobalContextProvider>
  )
}
export default App
