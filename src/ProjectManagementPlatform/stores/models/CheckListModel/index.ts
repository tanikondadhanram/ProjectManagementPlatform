import { observable, action } from 'mobx'

class CheckListModel {
   @observable isChecked: boolean
   isRequired: boolean
   id
   name

   constructor(props) {
      this.name = props.name
      this.isChecked = true
      this.isRequired = props.is_required
      this.id = props.checklist_id
      this.toggleIsChecked()
   }

   @action.bound
   toggleIsChecked() {
      this.isChecked = !this.isChecked
   }
}

export default CheckListModel
