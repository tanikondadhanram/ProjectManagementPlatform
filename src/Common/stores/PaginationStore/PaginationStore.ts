import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class PaginationStore {
   @observable apiStatus!: APIStatus
   @observable apiError!: Error | null
   @observable apiResponse!: any
   @observable offset: number
   limit: number
   service
   constructor(props) {
      this.service = props.service
      this.offset = props.offset
      this.limit = props.limit
      this.init()
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetPaginationStoreApiStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetPaginationStoreApiError(error: Error) {
      this.apiError = error
   }

   @action.bound
   setGetPaginationStoreApiResponse(response: any) {
      this.apiResponse = response.results
   }

   @action.bound
   getPages() {
      const pagesPromise = this.service()
      return bindPromiseWithOnSuccess(pagesPromise)
         .to(
            this.setGetPaginationStoreApiStatus,
            this.setGetPaginationStoreApiResponse
         )
         .catch(this.setGetPaginationStoreApiError)
   }

   @action.bound
   navigateToClickedPage(pageNumber: number) {
      this.offset = pageNumber * this.limit
   }
}

export default PaginationStore
