import { } from 'react'
import './App.css'
import { AppRoutes } from './routes'
import { GlobalContextProvider, StateEditor } from './store'
import AppErrorBoundary from './middlewares/error'
import { AxiosProvider } from './services/http'
import Nav from './views/Index/Nav'
import Background from './views/Index/Background'
function App() {
  return (
    <div className="App">
      <div className='flex justify-center pt-[50px]'>
        <AppMainContent />
      </div>
    </div>
  )
}

const AppMainContent = () => {
  return (
    <GlobalContextProvider>
      <AxiosProvider>
        <AppErrorBoundary>
          <AppRoutes>
            <Nav />
            <Background />
          </AppRoutes>
          {/* <StateEditor /> */}
        </AppErrorBoundary>
      </AxiosProvider>
    </GlobalContextProvider>
  )
}
export default App
