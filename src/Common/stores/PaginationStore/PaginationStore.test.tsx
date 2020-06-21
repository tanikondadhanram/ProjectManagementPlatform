import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { PaginationStore } from '.'

describe('PaginationStore Tests', () => {
   let paginationService
   let paginationStore

   beforeEach(() => {
      paginationService = () => Promise.resolve('pages')
      paginationStore = new PaginationStore({
         service: paginationService,
         limit: 10,
         offset: 0
      })
   })

   it('Should Test Store Is Initialised', () => {
      expect(paginationStore.apiStatus).toBe(API_INITIAL)
      expect(paginationStore.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      paginationStore.getPages()
      expect(paginationStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await paginationStore.getPages()
      expect(paginationStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      paginationStore.service = () => Promise.reject('Failed')

      await paginationStore.getPages()

      expect(paginationStore.apiStatus).toBe(API_FAILED)
   })

   it('Should Test Navigation Fn', () => {
      paginationStore.navigateToClickedPage(1)
      expect(paginationStore.offset).toBe(10)
   })

   it('Should Test Store Is Cleared', () => {
      paginationStore.clearStore()
      expect(paginationStore.apiStatus).toBe(API_INITIAL)
      expect(paginationStore.apiError).toBe(null)
   })
})
