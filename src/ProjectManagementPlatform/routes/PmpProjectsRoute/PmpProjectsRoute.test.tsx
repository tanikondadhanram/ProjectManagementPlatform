import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import ProjectsFixturesAPI from '../../services/ProjectsService/index.fixtures'
import { ProjectManagementPlatformStore } from '../../stores/ProjectManagementPlatformStore'

import { PmpProjectsRoute } from '.'

describe('PmpProjectsRoute Tests', () => {
   let pmpStore
   let pmpService

   beforeEach(() => {
      pmpService = new ProjectsFixturesAPI()
      pmpStore = new ProjectManagementPlatformStore(pmpService)
   })

   it('should test route is rendered', () => {
      window.localStorage.setItem(
         'userDetails',
         JSON.stringify(
            JSON.stringify({
               access_token: 'qwerty',
               refresh_token: 'ytrewq',
               expires_in: 0,
               is_admin: true,
               profile_pic: 'qwerty',
               name: 'username'
            })
         )
      )
      render(
         <Provider projectManagementPlatformStore={pmpStore}>
            <Router history={createMemoryHistory()}>
               <PmpProjectsRoute />
            </Router>
         </Provider>
      )
   })
})
