import { types } from 'mobx-state-tree'
import { API_INITIAL } from '@ib/api-constants'

const CheckListModel = types
   .model({
      isChecked: types.boolean,
      isRequired: types.boolean,
      id: types.number,
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
      checkListStoreApiResponse: types.maybeNull(types.string),
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
               isChecked: eachCheck.isChecked,
               isRequired: eachCheck.isRequired,
               id: eachCheck.id,
               name: eachCheck.name
            })
         )
      },
      setGetCheckListStorePostAPIStatus(status: number) {
         self.checkListStorePostApiStatus = status
      },
      setGetCheckListStorePostApiError(error: string) {
         self.checkListStorePostApiError = error
      },
      setGetCheckListStorePostApiResponse(response: any) {
         self.checkListStorePostApiResponse = response
      }
   }))

export default CheckListStoreModel
