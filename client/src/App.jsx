import { } from 'react'

import './App.css'
import { AppRoute } from './routes'
import { GlobalContextProvider, StateEditor } from './store'


function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <AppRoute />

        {/* <StateEditor /> */}
      </div>
    </GlobalContextProvider>
  )
}

export default App
