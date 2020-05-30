import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import WorkFlowFixtureService from '../../services/WorkFlowService/index.fixture'

import WorkFlowStore from './WorkFlowStore'

describe('WorkFlowStore Tests', () => {
   let workFlowApi
   let workFlowStore

   beforeEach(() => {
      workFlowApi = new WorkFlowFixtureService()
      workFlowStore = new WorkFlowStore(workFlowApi)
   })

   it('Should Test Store Is Initialised', () => {
      expect(workFlowStore.apiStatus).toBe(API_INITIAL)
      expect(workFlowStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      workFlowStore.getWorkFlowTypes()
      expect(workFlowStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await workFlowStore.getWorkFlowTypes()
      expect(workFlowStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      workFlowApi.getWorkFlowAPI = mockApi

      await workFlowStore.getWorkFlowTypes()

      expect(workFlowStore.apiStatus).toBe(API_FAILED)
   })
})
