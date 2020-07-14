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
      expect(tasksStore.taskStoreApiStatus).toBe(API_INITIAL)
      expect(tasksStore.taskStoreApiError).toBe(null)
   })

   it('Should Test Store Is taskStoreApiStatus Is Fetching', () => {
      tasksStore.getListOfTasks()
      expect(tasksStore.taskStoreApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is taskStoreApiStatus Is Success', async () => {
      await tasksStore.getListOfTasks()

      expect(tasksStore.taskStoreApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store taskStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      tasksApi.getListOfTasksAPI = mockApi

      await tasksStore.getListOfTasks()

      expect(tasksStore.taskStoreApiStatus).toBe(API_FAILED)
   })

   it('Should Test NavigateToClickedPage Fn', () => {
      tasksStore.navigateToClickedPage({ selected: 1 })
      expect(tasksStore.offset).toBe(10)
   })

   it('Should Test Store Is Cleared', () => {
      tasksStore.clearStore()
      expect(tasksStore.taskStoreApiStatus).toBe(API_INITIAL)
      expect(tasksStore.taskStoreApiError).toBe(null)
   })
})
