import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import TasksStore from './TasksStore'

import ListOfTasksFixtureService from '../../services/ListOfTasksService/index.fixture'

describe('TasksStore Tests', () => {
   let tasksApi
   let tasksStore

   beforeEach(() => {
      tasksApi = new ListOfTasksFixtureService()
      tasksStore = new TasksStore(tasksApi)
   })

   it('Should Test Store Is Initialised', () => {
      expect(tasksStore.apiStatus).toBe(API_INITIAL)
      expect(tasksStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      tasksStore.getListOfTasks()
      expect(tasksStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await tasksStore.getListOfTasks()

      expect(tasksStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      tasksApi.getListOfTasksAPI = mockApi

      await tasksStore.getListOfTasks()

      expect(tasksStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test NavigateToClickedPage Fn', () => {
      tasksStore.navigateToClickedPage({ selected: 1 })
      expect(tasksStore.offset).toBe(10)
   })

   it('Should Test Store Is Cleared', () => {
      tasksStore.clearStore()
      expect(tasksStore.apiStatus).toBe(API_INITIAL)
      expect(tasksStore.apiError).toBe(null)
   })
})
