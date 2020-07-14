import { types } from 'mobx-state-tree'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import ProjectsService from '../../services/ProjectsService/index.mst'

import listOfProjects from '../../fixtures/ListOfProjects.json'

import ProjectManagementPlatformStore from './pmpStore.mst'

describe('ProjectManagementPlatformStore tests', () => {
   let projectsService
   let projectsStore

   beforeEach(() => {
      projectsService = ProjectsService.create()

      projectsStore = ProjectManagementPlatformStore.create(
         {
            pmpStoreApiStatus: API_INITIAL,
            pmpStoreApiError: null,

            listOfProjects: [],
            offset: 0,
            limit: 10,
            totalProjectsLength: 0
         },
         {
            projectsService
         }
      )
   })

   it('Should Test Store Is Initialised', () => {
      expect(projectsStore.pmpStoreApiStatus).toBe(API_INITIAL)
      expect(projectsStore.pmpStoreApiError).toBe(null)
   })

   it('Should Test Store pmpStoreApiStatus Is Fetching', () => {
      projectsStore.getProjects()
      expect(projectsStore.pmpStoreApiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store pmpStoreApiStatus Is Success', async () => {
      const mockSuccessPromise = Promise.resolve({
         total_projects: listOfProjects.length,
         projects: listOfProjects
      })
      const mockSignInAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      projectsService.getProjectsAPI = mockSignInAPI

      await projectsStore.getProjects()
      expect(projectsStore.pmpStoreApiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store pmpStoreApiStatus Is Failed', async () => {
      const mockSuccessPromise = Promise.reject('error')
      const mockSignInAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      projectsStore.getProjectsAPI = mockSignInAPI

      await projectsStore.getProjects()
      expect(projectsStore.pmpStoreApiStatus).toBe(API_FAILED)
   })

   it('Should Test NavigateToClickedPage Fn', () => {
      projectsStore.navigateToClickedPage({ selected: 1 })
      expect(projectsStore.offset).toBe(10)
   })

   it('Should Test Store Is Cleared', () => {
      projectsStore.clearStore()
      expect(projectsStore.pmpStoreApiStatus).toBe(API_INITIAL)
      expect(projectsStore.pmpStoreApiError).toBe(null)
   })
})
