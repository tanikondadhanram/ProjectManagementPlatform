import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observable } from 'mobx'
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
   @observable usernameEmptyMessage: string | null
   @observable passwordEmptyMessage: string | null

   constructor(props) {
      super(props)
      this.username = null
      this.password = null
      this.usernameEmptyMessage = null
      this.passwordEmptyMessage = null
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

   onSignInSucess = () => {
      this.username = null
      this.password = null
      this.usernameEmptyMessage = null
      this.passwordEmptyMessage = null
      const { history } = this.props
      history.replace(PROJECTS_PATH)
   }

   onSignInFailure = () => {
      let { apiError } = this.props.authStore
      apiError = JSON.parse(apiError)

      if (apiError.status === null) {
         toast.error(getUserDisplayableErrorMessage(apiError))
      }
   }

   onChangeUsername = (event: { target: { value: string } }) => {
      this.username = event.target.value
      this.usernameEmptyMessage = null
   }

   onChangePassword = (event: { target: { value: string } }) => {
      this.password = event.target.value
      this.passwordEmptyMessage = null
   }

   onUserSubmit = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      if (this.username && this.password) {
         this.setUser()
      } else {
         if (!Boolean(this.username)) {
            this.usernameEmptyMessage = stringConstants['enterUsername']
         }
         if (!Boolean(this.password)) {
            this.passwordEmptyMessage = stringConstants['enterPassword']
         }
      }
   }

   render() {
      const signInFormProps = {
         username: this.username,
         password: this.password,
         onChangeUsername: this.onChangeUsername,
         onChangePassword: this.onChangePassword,
         onUserSubmit: this.onUserSubmit,
         apiStatus: this.props.authStore.apiStatus,
         apiError: this.props.authStore.apiError,
         usernameEmptyMessage: this.usernameEmptyMessage,
         passwordEmptyMessage: this.passwordEmptyMessage
      }

      return <SignInForm {...signInFormProps} />
   }
}

withRouter(SignInRoute)

export { SignInRoute }
