import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css'
import { authStore } from '../Authentication/stores/index'
import { authRoutes } from '../Authentication/routes'
import { projectManagementRoutes } from '../ProjectManagementPlatform/routes'
import {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
} from '../ProjectManagementPlatform/stores'

const routes = [authRoutes, projectManagementRoutes]

const stores = {
   authStore,
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
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
