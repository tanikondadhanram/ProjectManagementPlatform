import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import CheckListModel from '../models/CheckListModel'

class CheckListStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable postApiStatus!: number
   @observable postApiError!: null | string
   postApiResponse
   checkList!: any
   checkListService

   constructor(service) {
      this.checkListService = service
      this.init()
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.postApiStatus = API_INITIAL
      this.apiError = null
      this.postApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetCheckListAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetCheckListAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetCheckListAPIResponse(response: any) {
      this.checkList = response.check_list.map(
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
   setGetCheckListPostAPIStatus(status: number) {
      this.postApiStatus = status
   }

   @action.bound
   setGetCheckListPostAPIError(error: string) {
      this.postApiError = error
   }

   @action.bound
   setGetCheckListPostAPIResponse(response: any) {
      this.postApiResponse = response
   }

   postCheckList = (requestObject, onSuccess, onFailure) => {
      const checkListPromise = this.checkListService.postCheckListAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(checkListPromise)
         .to(this.setGetCheckListAPIStatus, response => {
            this.setGetCheckListAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetCheckListAPIError(error)
            onFailure()
         })
   }
}

export default CheckListStore
