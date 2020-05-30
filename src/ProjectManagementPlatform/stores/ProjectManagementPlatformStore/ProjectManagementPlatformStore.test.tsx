import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import ProjectsFixturesAPI from '../../services/ProjectsService/Projects.fixtures'

import listOfProjects from '../../fixtures/ListOfProjects.json'

import { ProjectManagementPlatformStore } from '.'

describe('ProjectManagementPlatformStore tests', () => {
   let projectsApi
   let projectsStore

   beforeEach(() => {
      projectsApi = new ProjectsFixturesAPI()
      projectsStore = new ProjectManagementPlatformStore(projectsApi)
   })

   it('Should Test Store Is Initialised', () => {
      expect(projectsStore.apiStatus).toBe(API_INITIAL)
      expect(projectsStore.apiError).toBe(null)
   })

   it('Should Test Store apiStatus Is Fetching', () => {
      projectsStore.getProjects()
      expect(projectsStore.apiStatus).toBe(API_FETCHING)
   })

   it('Should Test Store apiStatus Is Success', async () => {
      const mockSuccessPromise = Promise.resolve(listOfProjects)
      const mockSignInAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      projectsApi.getProjectsAPI = mockSignInAPI

      await projectsStore.getProjects()
      expect(projectsStore.apiStatus).toBe(API_SUCCESS)
   })

   it('Should Test Store apiStatus Is Failed', async () => {
      const mockSuccessPromise = Promise.reject('error')
      const mockSignInAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      projectsApi.getProjectsAPI = mockSignInAPI

      await projectsStore.getProjects()
      expect(projectsStore.apiStatus).toBe(API_FAILED)
   })
})
