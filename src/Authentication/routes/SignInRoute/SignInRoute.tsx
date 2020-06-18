import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'

import { SignInForm } from '../../components/SignInForm'
import { PROJECTS_PATH } from '../../../ProjectManagementPlatform/constants/routeConstants'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

import stringConstants from '../../constants/stringConstants/stringConstants.json'

@inject('authStore')
@observer
class SignInRoute extends Component<any, any> {
   @observable username: string | null
   @observable password: string | null
   @observable usernameErrorMessage: string | null
   @observable passwordErrorMessage: string | null
   usernameRef!: any
   passwordRef!: any

   constructor(props) {
      super(props)
      this.username = null
      this.password = null
      this.usernameErrorMessage = null
      this.passwordErrorMessage = null
      this.usernameRef = React.createRef()
      this.passwordRef = React.createRef()
   }

   componentDidMount() {
      this.usernameRef.current.focus()
   }

   setUser() {
      const { userSignIn } = this.props.authStore
      userSignIn(
         {
            username: this.username,
            password: this.password
         },
         this.onSignInSucess,
         this.onSignInFailure
      )
   }

   @action.bound
   onSignInSucess() {
      this.username = null
      this.password = null
      this.usernameErrorMessage = null
      this.passwordErrorMessage = null
      const { history } = this.props
      history.replace(PROJECTS_PATH)
   }

   @action.bound
   onSignInFailure() {
      let { apiError } = this.props.authStore

      const errorObject = JSON.parse(apiError)
      if (errorObject.status === null) {
         toast.error(getUserDisplayableErrorMessage(apiError))
      }
      if (errorObject.status === 401) {
         this.passwordErrorMessage = errorObject.data.response
      }
      if (errorObject.status === 404) {
         this.usernameErrorMessage = errorObject.data.response
      }
   }

   @action.bound
   onChangeUsername(event: { target: { value: string } }) {
      this.username = event.target.value
      this.usernameErrorMessage = null
   }

   @action.bound
   onChangePassword(event: { target: { value: string } }) {
      this.password = event.target.value
      this.passwordErrorMessage = null
   }

   @action.bound
   onUserSubmit(event: { preventDefault: () => void }) {
      event.preventDefault()

      const isUsernameFeildEmpty = this.usernameRef.current.value === ''
      const isPasswordFeildEmpty = this.passwordRef.current.value === ''

      if (!isUsernameFeildEmpty && !isPasswordFeildEmpty) {
         this.setUser()
      } else {
         this.usernameErrorMessage = isUsernameFeildEmpty
            ? stringConstants['enterUsername']
            : null

         this.passwordErrorMessage = isPasswordFeildEmpty
            ? stringConstants['enterPassword']
            : null
      }
   }

   render() {
      const signInFormProps = {
         username: this.username,
         password: this.password,
         usernameRef: this.usernameRef,
         passwordRef: this.passwordRef,
         onChangeUsername: this.onChangeUsername,
         onChangePassword: this.onChangePassword,
         onUserSubmit: this.onUserSubmit,
         apiStatus: this.props.authStore.apiStatus,
         apiError: this.props.authStore.apiError,
         usernameErrorMessage: this.usernameErrorMessage,
         passwordErrorMessage: this.passwordErrorMessage,
         isValidUsername: !Boolean(this.usernameErrorMessage),
         isValidPassword: !Boolean(this.passwordErrorMessage)
      }

      return <SignInForm {...signInFormProps} />
   }
}

export default withRouter(SignInRoute)
