import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import projectsData from '../../fixtures/ListOfProjects.json'

const ProjectsAPI = types.model().actions(self => ({
   getProjectsAPI(requestObject) {
      const { limit, offset } = requestObject
      return resolveWithTimeout(projectsData.slice().splice(offset, limit))
   },
   postProjectAPI(requestObject) {
      return resolveWithTimeout(requestObject)
   }
}))

export default ProjectsAPI
