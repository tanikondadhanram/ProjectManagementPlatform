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
      expect(checkListStore.checkListStoreApiStatus).toBe(API_INITIAL)
      expect(checkListStore.checkListStoreApiError).toBe(null)
   })

   it('Should Test Store Is checkListStoreApiStatus Is Fetching', () => {
      checkListStore.getCheckList()
      expect(checkListStore.checkListStoreApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is checkListStoreApiStatus Is Success', async () => {
      await checkListStore.getCheckList()
      expect(checkListStore.checkListStoreApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store checkListStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      checkListFixtureService.getCheckListAPI = mockApi

      await checkListStore.getCheckList()

      expect(checkListStore.checkListStoreApiStatus).toBe(API_FAILED)
   })

   it('Should Test CheckList Post Api Is Initialised', () => {
      expect(checkListStore.checkListStorePostApiStatus).toBe(API_INITIAL)
      expect(checkListStore.checkListStorePostApiError).toBe(null)
   })

   it('Should Test CheckList Post Api Is Fetching', () => {
      checkListStore.postCheckList()
      expect(checkListStore.checkListStorePostApiStatus).toBe(API_FETCHING)
   })

   it('Should Test CheckList Post Api Is Success', async () => {
      await checkListStore.postCheckList()
      expect(checkListStore.checkListStorePostApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store checkListStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      checkListFixtureService.postCheckListAPI = mockApi

      await checkListStore.postCheckList()

      expect(checkListStore.checkListStorePostApiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      checkListStore.clearStore()
      expect(checkListStore.checkListStoreApiStatus).toBe(API_INITIAL)
      expect(checkListStore.checkListStoreApiError).toBe(null)
   })
})
