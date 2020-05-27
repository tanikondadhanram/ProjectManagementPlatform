import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { SignInForm } from '../../components/SignInForm'
import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../../../ProjectManagementPlatform/constants/routeConstants'

@inject('authStore')
@observer
class SignInRoute extends Component<any, any> {
   @observable username: string
   @observable password: string
   @observable errorMessage: string

   constructor(props) {
      super(props)
      this.username = ''
      this.password = ''
      this.errorMessage = ''
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
      this.errorMessage = ''
   }

   onChangePassword = (event: { target: { value: string } }) => {
      this.password = event.target.value
      this.errorMessage = ''
   }

   onUserSubmit = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      if (this.username === '' || this.password === '') {
         if (this.username === '') {
            this.errorMessage = 'please enter username'
         } else {
            this.errorMessage = 'please enter password'
         }
      } else {
         this.setUser()
      }
   }

   render() {
      const signInFormProps = {
         username: this.username,
         password: this.password,
         onChangeUsername: this.onChangeUsername,
         onChangePassword: this.onChangePassword,
         onUserSubmit: this.onUserSubmit,
         errorMessage: this.errorMessage,
         apiStatus: this.props.authStore.apiStatus
      }

      return <SignInForm {...signInFormProps} />
   }
}

withRouter(SignInRoute)

export { SignInRoute }
