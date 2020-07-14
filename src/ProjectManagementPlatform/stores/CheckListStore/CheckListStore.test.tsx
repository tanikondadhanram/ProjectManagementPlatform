import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import CheckListService from '../../services/CheckListService/index.mst'

import CheckListStoreModel from './CheckListStore.mst'

describe('CheckListStore Tests', () => {
   let checkListService
   let checkListStore

   beforeEach(() => {
      checkListService = CheckListService.create()
      checkListStore = CheckListStoreModel.create(
         {
            checkListStoreApiStatus: API_INITIAL,
            checkListStoreApiError: null,
            checkListStoreApiResponse: null,
            checkListStorePostApiStatus: API_INITIAL,
            checkListStorePostApiError: null,
            checkListStorePostApiResponse: null
         },
         { checkListService: CheckListService.create() }
      )
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
      checkListService.getCheckListAPI = jest
         .fn()
         .mockReturnValue(Promise.reject(new Error('Failed')))

      await checkListStore.getCheckList()
      expect(checkListStore.checkListStoreApiStatus + 200).toBe(API_FAILED)
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
      await checkListStore.postCheckList({}, jest.fn, jest.fn)
      expect(checkListStore.checkListStorePostApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store checkListStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject(new Error('Failed')))
      )

      checkListService.postCheckListAPI = mockApi

      await checkListStore.postCheckList({}, jest.fn, jest.fn)

      expect(checkListStore.checkListStorePostApiStatus + 200).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      checkListStore.clearStore()
      expect(checkListStore.checkListStoreApiStatus).toBe(API_INITIAL)
      expect(checkListStore.checkListStoreApiError).toBe(null)
   })
})
