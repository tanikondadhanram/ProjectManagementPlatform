import { types, getEnv } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

const CheckListModel = types
   .model({
      isChecked: types.boolean,
      is_required: types.boolean,
      checklist_id: types.number,
      name: types.string
   })
   .actions(self => ({
      toggleIsChecked() {
         self.isChecked = !self.isChecked
      }
   }))

const CheckListStoreModel = types
   .model({
      checkListStoreApiStatus: types.number,
      checkListStoreApiError: types.maybeNull(types.string),
      checkListStoreApiResponse: types.maybeNull(types.array(CheckListModel)),
      checkListStorePostApiStatus: types.number,
      checkListStorePostApiError: types.maybeNull(types.string),
      checkListStorePostApiResponse: types.maybeNull(types.string)
   })
   .actions(self => ({
      init() {
         self.checkListStoreApiStatus = API_INITIAL
         self.checkListStorePostApiStatus = API_INITIAL
         self.checkListStoreApiError = null
         self.checkListStorePostApiError = null
      },
      clearStore() {
         this.init()
      },
      setGetCheckListAPIStatus(status: number) {
         self.checkListStoreApiStatus = status
      },
      setGetCheckListAPIError(error: string) {
         self.checkListStoreApiError = error
      },
      setGetCheckListAPIResponse(response: any) {
         self.checkListStoreApiResponse = response.check_list.map(eachCheck =>
            CheckListModel.create({
               isChecked: false,
               is_required: eachCheck.is_required,
               checklist_id: eachCheck.checklist_id,
               name: eachCheck.name
            })
         )
      },
      getCheckList(reqeustOptions) {
         const checkListPromise = getEnv(
            self
         ).checkListService.getCheckListAPI()
         return bindPromiseWithOnSuccess(checkListPromise)
            .to(this.setGetCheckListAPIStatus, response => {
               this.setGetCheckListAPIResponse(response)
            })
            .catch(error => {
               this.setGetCheckListAPIError(error)
            })
      },
      setGetCheckListStorePostAPIStatus(status: number) {
         self.checkListStorePostApiStatus = status
      },
      setGetCheckListStorePostApiError(error: string) {
         self.checkListStorePostApiError = error
      },
      setGetCheckListStorePostApiResponse(response: any) {
         self.checkListStorePostApiResponse = response
      },
      postCheckList(requestObject, onSuccess, onFailure) {
         const checkListPromise = getEnv(
            self
         ).checkListService.postCheckListAPI(requestObject)

         return bindPromiseWithOnSuccess(checkListPromise)
            .to(this.setGetCheckListStorePostAPIStatus, response => {
               this.setGetCheckListStorePostApiResponse(response)
               onSuccess()
            })
            .catch(error => {
               this.setGetCheckListStorePostApiError(error)
               onFailure()
            })
      }
   }))

export default CheckListStoreModel
