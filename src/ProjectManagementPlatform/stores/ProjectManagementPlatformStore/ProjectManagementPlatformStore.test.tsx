import { API_INITIAL, API_FETCHING, API_SUCCESS } from '@ib/api-constants'

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

   it('Should Test Store Successfully Fetched Data ', async () => {
      await projectsStore.getProjects()
      expect(projectsStore.apiStatus).toBe(API_SUCCESS)
   })

   // it('Should Test Store Is Failed to Fetched Data ', async () => {
   //    await projectsStore.getProjects()
   //    expect(projectsStore.apiStatus).toBe(API_SUCCESS)
   // })
})
