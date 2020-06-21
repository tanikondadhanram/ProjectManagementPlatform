import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { routes } from '../Common/routes'

import { stores } from '../Common/stores'

import './App.css'

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
