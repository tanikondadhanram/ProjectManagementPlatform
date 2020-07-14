import { types } from 'mobx-state-tree'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import WorkFlowService from '../../services/WorkFlowService/index.mst'

import WorkFlowStoreModel from './WorkFlowStore.mst'

describe('WorkFlowStore Tests', () => {
   let workFlowService
   let workFlowStore

   beforeEach(() => {
      workFlowService = WorkFlowService.create()

      workFlowStore = WorkFlowStoreModel.create(
         {
            workFlowStoreApiStatus: 0,
            workFlowStoreApiError: null,
            workFlowTypes: null
         },
         { workFlowService }
      )
   })

   it('Should Test Store Is Initialised', () => {
      expect(workFlowStore.workFlowStoreApiStatus).toBe(API_INITIAL)
      expect(workFlowStore.workFlowStoreApiError).toBe(null)
   })

   it('Should Test Store Is workFlowStoreApiStatus Is Fetching', () => {
      workFlowStore.getWorkFlowTypes()
      expect(workFlowStore.workFlowStoreApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is workFlowStoreApiStatus Is Success', async () => {
      await workFlowStore.getWorkFlowTypes()
      expect(workFlowStore.workFlowStoreApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store workFlowStoreApiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(Promise.reject(new Error('Failed')))

      workFlowService.getWorkFlowAPI = mockApi

      await workFlowStore.getWorkFlowTypes()

      expect(workFlowStore.workFlowStoreApiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      workFlowStore.clearStore()
      expect(workFlowStore.workFlowStoreApiStatus).toBe(API_INITIAL)
      expect(workFlowStore.workFlowStoreApiError).toBe(null)
   })
})
