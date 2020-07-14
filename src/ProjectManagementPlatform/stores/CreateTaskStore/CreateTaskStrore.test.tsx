import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import CreateTaskService from '../../services/CreateTaskService/index.mst'

import CreateTaskStoreModel from './CreateTaskStore.mst'

describe('WorkFlowStore Tests', () => {
   let createTaskService
   let createTaskStore

   beforeEach(() => {
      createTaskService = CreateTaskService.create()
      createTaskStore = CreateTaskStoreModel.create(
         {
            createTaskApiStatus: API_INITIAL,
            createTaskApiError: null,
            createTaskApiResponse: null
         },
         { createTaskService }
      )
   })

   it('Should Test Store Is Initialised', () => {
      expect(createTaskStore.createTaskApiStatus).toBe(API_INITIAL)
      expect(createTaskStore.createTaskApiError).toBe(null)
   })

   it('Should Test Store Is createTaskApiStatus Is Fetching', () => {
      createTaskStore.postCreatedTask()
      expect(createTaskStore.createTaskApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is createTaskApiStatus Is Success', async () => {
      await createTaskStore.postCreatedTask()
      expect(createTaskStore.createTaskApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store createTaskApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      createTaskService.CreateTaskAPI = mockApi

      await createTaskStore.postCreatedTask()

      expect(createTaskStore.createTaskApiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      createTaskStore.clearStore()
      expect(createTaskStore.createTaskApiStatus).toBe(API_INITIAL)
      expect(createTaskStore.createTaskApiError).toBe(null)
   })
})
