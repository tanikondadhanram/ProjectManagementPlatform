import React, { Suspense } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { I18nextProvider, useTranslation } from 'react-i18next'

import { routes } from '../Common/routes'

import { stores } from '../Common/stores'

import i18n from './i18n'

const App = () => {
   return (
      <Provider {...stores}>
         <I18nextProvider i18n={i18n}>
            <Suspense fallback={<p>welcome</p>}>
               <Router basename={process.env.PUBLIC_URL}>
                  <Switch>{routes}</Switch>
               </Router>
            </Suspense>
         </I18nextProvider>
      </Provider>
   )
}

export default App
