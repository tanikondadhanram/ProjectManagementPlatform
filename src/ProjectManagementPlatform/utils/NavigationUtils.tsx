import { PROJECTS_PATH } from '../constants/routeConstants'

export const goToSpecificProject = (history, id) =>
   history.push(`${PROJECTS_PATH}/${id}`)
