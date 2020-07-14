import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import ProjectPostService from '../../services/ProjectPostService/index.mst'

import ProjectPostStore from './ProjectPostStore.mst'

describe('ProjectPostStore Tests', () => {
   let projectPostService
   let projectPostStore

   beforeEach(() => {
      projectPostService = ProjectPostService.create()
      projectPostStore = ProjectPostStore.create(
         {
            projectPostStoreApiStatus: 0,
            projectPostStoreApiError: null,
            projectPostStoreApiResponse: null
         },
         { projectPostService }
      )
   })

   it('Should Test Store Is Initialised', () => {
      expect(projectPostStore.projectPostStoreApiStatus).toBe(API_INITIAL)
      expect(projectPostStore.projectPostStoreApiError).toBe(null)
   })

   it('Should Test Store Is projectPostStoreApiStatus Is Fetching', () => {
      projectPostStore.projectPostCall()
      expect(projectPostStore.projectPostStoreApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is projectPostStoreApiStatus Is Success', async () => {
      await projectPostStore.projectPostCall()
      expect(projectPostStore.projectPostStoreApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store projectPostStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      projectPostService.postProjectAPI = mockApi

      await projectPostStore.projectPostCall()

      expect(projectPostStore.projectPostStoreApiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      projectPostStore.clearStore()
      expect(projectPostStore.projectPostStoreApiStatus).toBe(API_INITIAL)
      expect(projectPostStore.projectPostStoreApiError).toBe(null)
   })
})
