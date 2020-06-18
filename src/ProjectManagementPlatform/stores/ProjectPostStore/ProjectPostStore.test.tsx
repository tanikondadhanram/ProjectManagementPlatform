import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import ProjectPostFixture from '../../services/ProjectPostService/index.fixture'

import ProjectPostStore from './ProjectPostStore'

describe('ProjectPostStore Tests', () => {
   let projectPostService
   let projectPostStore

   beforeEach(() => {
      projectPostService = new ProjectPostFixture()
      projectPostStore = new ProjectPostStore(projectPostService)
   })

   it('Should Test Store Is Initialised', () => {
      expect(projectPostStore.apiStatus).toBe(API_INITIAL)
      expect(projectPostStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      projectPostStore.projectPostCall()
      expect(projectPostStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await projectPostStore.projectPostCall()
      expect(projectPostStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      projectPostService.postProjectAPI = mockApi

      await projectPostStore.projectPostCall()

      expect(projectPostStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      projectPostStore.clearStore()
      expect(projectPostStore.apiStatus).toBe(API_INITIAL)
      expect(projectPostStore.apiError).toBe(null)
   })
})
