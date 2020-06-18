import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { authStore } from '../../../Authentication/stores'

import CheckListFixtureService from '../../services/CheckListService/index.fixture'

import { CheckListStore } from '.'

describe('CheckListStore Tests', () => {
   let checkListFixtureService
   let checkListStore

   beforeEach(() => {
      checkListFixtureService = new CheckListFixtureService()
      checkListStore = new CheckListStore(checkListFixtureService)
   })

   it('Should Test Store Is Initialised', () => {
      expect(checkListStore.apiStatus).toBe(API_INITIAL)
      expect(checkListStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      checkListStore.getCheckList()
      expect(checkListStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await checkListStore.getCheckList()
      expect(checkListStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      checkListFixtureService.getCheckListAPI = mockApi

      await checkListStore.getCheckList()

      expect(checkListStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test CheckList Post Api Is Initialised', () => {
      expect(checkListStore.postApiStatus).toBe(API_INITIAL)
      expect(checkListStore.postApiError).toBe(null)
   })

   it('Should Test CheckList Post Api Is Fetching', () => {
      checkListStore.postCheckList()
      expect(checkListStore.postApiStatus).toBe(API_FETCHING)
   })

   it('Should Test CheckList Post Api Is Success', async () => {
      await checkListStore.postCheckList()
      expect(checkListStore.postApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      checkListFixtureService.postCheckListAPI = mockApi

      await checkListStore.postCheckList()

      expect(checkListStore.postApiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      checkListStore.clearStore()
      expect(checkListStore.apiStatus).toBe(API_INITIAL)
      expect(checkListStore.apiError).toBe(null)
   })
})
