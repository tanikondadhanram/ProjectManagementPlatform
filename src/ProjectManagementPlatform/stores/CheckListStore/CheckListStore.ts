import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import CheckListModel from '../models/CheckListModel'

class CheckListStore {
   @observable checkListStoreApiStatus!: number
   @observable checkListStoreApiError!: null | string
   @observable checkListStorePostApiStatus!: number
   @observable checkListStorePostApiError!: null | string
   checkListStorePostApiResponse
   checkListStoreAPiResponse!: any
   checkListService

   constructor(service) {
      this.checkListService = service
      this.init()
   }

   @action.bound
   init() {
      this.checkListStoreApiStatus = API_INITIAL
      this.checkListStorePostApiStatus = API_INITIAL
      this.checkListStoreApiError = null
      this.checkListStorePostApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetCheckListAPIStatus(status: number) {
      this.checkListStoreApiStatus = status
   }

   @action.bound
   setGetCheckListAPIError(error: string) {
      this.checkListStoreApiError = error
   }

   @action.bound
   setGetCheckListAPIResponse(response: any) {
      this.checkListStoreAPiResponse = response.check_list.map(
         eachCheck => new CheckListModel(eachCheck)
      )
   }

   @action.bound
   getCheckList(reqeustOptions) {
      const checkListPromise = this.checkListService.getCheckListAPI(
         reqeustOptions
      )
      return bindPromiseWithOnSuccess(checkListPromise)
         .to(this.setGetCheckListAPIStatus, response => {
            this.setGetCheckListAPIResponse(response)
         })
         .catch(error => {
            this.setGetCheckListAPIError(error)
         })
   }

   @action.bound
   setGetCheckListStorePostAPIStatus(status: number) {
      this.checkListStorePostApiStatus = status
   }

   @action.bound
   setGetCheckListStorePostApiError(error: string) {
      this.checkListStorePostApiError = error
   }

   @action.bound
   setGetCheckListStorePostApiResponse(response: any) {
      this.checkListStorePostApiResponse = response
   }

   postCheckList = (
      requestObject,
      onSuccess = () => null,
      onFailure = () => null
   ) => {
      const checkListPromise = this.checkListService.postCheckListAPI(
         requestObject
      )

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
}

export default CheckListStore
