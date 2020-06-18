import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import StatesFixtureService from '../../services/GetStatesService/index.fixture'

import StatesStore from './StatesStore'

describe('StatesStore Tests', () => {
   let statesService
   let statesStore

   beforeEach(() => {
      statesService = new StatesFixtureService()
      statesStore = new StatesStore(statesService)
   })

   it('Should Test Store Is Initialised', () => {
      expect(statesStore.apiStatus).toBe(API_INITIAL)
      expect(statesStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      statesStore.getStates()
      expect(statesStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await statesStore.getStates()
      expect(statesStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      statesService.getStatesAPI = mockApi

      await statesStore.getStates()

      expect(statesStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      statesStore.clearStore()
      expect(statesStore.apiStatus).toBe(API_INITIAL)
      expect(statesStore.apiError).toBe(null)
   })
})
