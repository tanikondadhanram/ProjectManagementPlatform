import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import StatesFixtureService from '../../../services/GetStatesService/index.fixture'

import TaskModel from '.'

describe('TaskModel Tests', () => {
   let statesApi
   let taskModel

   beforeEach(() => {
      statesApi = new StatesFixtureService()
      taskModel = new TaskModel({}, statesApi)
   })

   it('Should Test Store Is Initialised', () => {
      expect(taskModel.apiStatus).toBe(API_INITIAL)
      expect(taskModel.apiError).toBe(null)
   })

   it('Should Test Store Is apiStatus Is Fetching', () => {
      taskModel.getStates()
      expect(taskModel.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store Is apiStatus Is Success', async () => {
      await taskModel.getStates()
      expect(taskModel.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockApi = jest.fn()

      mockApi.mockReturnValue(
         new Promise((resolve, reject) => reject('Failed'))
      )

      statesApi.getStatesAPI = mockApi

      await taskModel.getStates()

      expect(taskModel.apiStatus).toBe(API_FAILED)
   })

   it('Should Test Store Is Cleared', () => {
      taskModel.clearStore()
      expect(taskModel.apiStatus).toBe(API_INITIAL)
      expect(taskModel.apiError).toBe(null)
   })
})
