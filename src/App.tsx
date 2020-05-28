import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css'
import { authStore } from './Authentication/stores/index'
import { authRoutes } from './Authentication/routes'
import { projectManagementRoutes } from './ProjectManagementPlatform/routes'
import { projectManagementPlatformStore } from './ProjectManagementPlatform/stores'

const routes = [projectManagementRoutes, authRoutes]
const stores = {
   authStore,
   projectManagementPlatformStore
}

const App = () => {
   return (
      <Provider {...stores}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>{routes}</Switch>
         </Router>
      </Provider>
   )
}

export default App