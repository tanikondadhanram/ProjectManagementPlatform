import { observable, action } from 'mobx'

class CheckListModel {
   @observable isChecked: boolean
   isRequired: boolean
   id
   name

   constructor(props) {
      console.log(props)

      this.name = props.name
      this.isChecked = false
      this.isRequired = props.is_required
      this.id = props.checklist_id
   }

   @action.bound
   toggleIsChecked() {
      this.isChecked = !this.isChecked
   }
}

export default CheckListModel
