import {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
} from '../../ProjectManagementPlatform/stores'

import { authStore } from '../../Authentication/stores/index'
import CounterStore from './CounterStore'

export const stores = {
   authStore,
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore,
   counterStore: new CounterStore()
}
