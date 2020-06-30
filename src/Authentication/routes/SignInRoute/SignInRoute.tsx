import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { toast } from 'react-toastify'
import { History } from 'history'

import { SignInForm } from '../../components/SignInForm'
import { SignInAPIRequestObject } from '../../stores/types'
import { AuthStore } from '../../stores/AuthStore'

import { PROJECTS_PATH } from '../../../ProjectManagementPlatform/constants/routeConstants'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'
interface SignInRoutePropsTypes extends RouteComponentProps {
   history: History
}
interface InjectedProps extends SignInRoutePropsTypes {
   authStore: AuthStore
}
@inject('authStore')
@observer
class SignInRoute extends Component<SignInRoutePropsTypes> {
   getInjectedProps = () => this.props as InjectedProps

   setUser = (userDetails: SignInAPIRequestObject) => {
      const { userSignIn } = this.getInjectedProps().authStore
      userSignIn(
         {
            username: userDetails.username,
            password: userDetails.password
         },
         this.onSignInSuccess,
         this.onSignInFailure
      )
   }

   @action.bound
   onSignInSuccess() {
      const { history } = this.props
      history.replace(PROJECTS_PATH)
   }

   @action.bound
   onSignInFailure(error: Error | null) {
      toast.error(getUserDisplayableErrorMessage(error))
   }

   render() {
      const { authStore } = this.getInjectedProps()
      const { signInApiStatus } = authStore
      const signInFormProps = {
         setUser: this.setUser,
         signInApiStatus: signInApiStatus
      }
      return <SignInForm {...signInFormProps} />
   }
}

export default withRouter(SignInRoute)
