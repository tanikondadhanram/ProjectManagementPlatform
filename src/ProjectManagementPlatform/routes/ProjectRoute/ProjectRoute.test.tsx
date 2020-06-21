import React from 'react'
import { render } from '@testing-library/react'
import { ProjectRoute } from '.'
import { Provider } from 'mobx-react'

import { createMemoryHistory } from 'history'

import { TasksStore } from '../../stores/TasksStore'
import ListOfTasksFixtureService from '../../services/ListOfTasksService/index.fixture'
import { Router } from 'react-router-dom'

describe('Project Route Tests', () => {
   const tasksService = new ListOfTasksFixtureService()
   const tasksStore = new TasksStore(tasksService)
   it('Should Test projectRoute Is Rendering', () => {
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
      const { getByText } = render(
         <Provider tasksStore={tasksStore}>
            <Router history={createMemoryHistory()}>
               <ProjectRoute />
            </Router>
         </Provider>
      )
      getByText('Project Management Platform')
   })
})
