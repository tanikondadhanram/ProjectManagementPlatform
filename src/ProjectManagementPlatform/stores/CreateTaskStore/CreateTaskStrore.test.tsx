import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { CreateTaskStore } from '.'

import CreateTaskFixtureService from '../../services/CreateTaskService/index.fixture'

describe('WorkFlowStore Tests', () => {
   let createTaskApi
   let createTaskStore

   beforeEach(() => {
      createTaskApi = new CreateTaskFixtureService()
      createTaskStore = new CreateTaskStore(createTaskApi)
   })

   it('Should Test Store Is Initialised', () => {
      expect(createTaskStore.apiStatus).toBe(API_INITIAL)
      expect(createTaskStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      createTaskStore.postCreatedTask()
      expect(createTaskStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await createTaskStore.postCreatedTask()
      expect(createTaskStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      createTaskApi.CreateTaskAPI = mockApi

      await createTaskStore.postCreatedTask()

      expect(createTaskStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      createTaskStore.clearStore()
      expect(createTaskStore.apiStatus).toBe(API_INITIAL)
      expect(createTaskStore.apiError).toBe(null)
   })
})