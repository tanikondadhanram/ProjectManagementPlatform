import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import stringConstants from '../../constants/stringConstants/stringConstants.json'
import { SignInForm } from '../../components/SignInForm'
import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../../../ProjectManagementPlatform/constants/routeConstants'

@inject('authStore')
@observer
class SignInRoute extends Component<any, any> {
   @observable username: string
   @observable password: string
   @observable usernameEmptyMessage: string | null
   @observable passwordEmptyMessage: string | null

   constructor(props) {
      super(props)
      this.username = ''
      this.password = ''
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
      const { history } = this.props
      history.replace(PROJECT_MANAGEMANT_PLATFORM_PATH)
   }

   onSignInFailure = () => {}

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
      if (this.username !== '' && this.password !== '') {
         this.setUser()
      } else {
         if (this.username === '') {
            this.usernameEmptyMessage = stringConstants['enterUsername']
         }
         if (this.password === '') {
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
