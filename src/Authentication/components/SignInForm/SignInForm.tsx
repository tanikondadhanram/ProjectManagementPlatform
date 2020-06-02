import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { InputField } from '../../../Common/components/InputField'
import { Button } from '../../../Common/components/Button'

import {
   SignInFormHeading,
   IbHubsLogo,
   FormTag,
   FormContainer,
   SignInFormContainer
} from './styledComponents'

import stringConstants from '../../constants/stringConstants/stringConstants.json'

class SignInForm extends Component<any, any> {
   notifyNetworkError = () => {
      toast.error(stringConstants['networkError'], {
         position: 'bottom-center',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
      })
      return null
   }

   render() {
      const {
         username,
         password,
         onChangeUsername,
         onChangePassword,
         onUserSubmit,
         apiStatus,
         apiError,
         usernameEmptyMessage,
         passwordEmptyMessage,
         networkErrorMessage
      } = this.props

      // alert(networkErrorMessage)
      const isValidUsername = apiError
         ? apiError
         : usernameEmptyMessage
         ? usernameEmptyMessage
         : null

      const isValidPassword = apiError
         ? apiError
         : passwordEmptyMessage
         ? passwordEmptyMessage
         : null

      return (
         <SignInFormContainer>
            <FormContainer>
               <IbHubsLogo
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9837b0f6-9165-49b3-995e-c6ac4ed19c55.svg'
                  alt='IbHubs-Logo'
               />
               <SignInFormHeading>
                  {stringConstants['Hi there , please sign up']}
               </SignInFormHeading>
               <FormTag>
                  <InputField
                     type='text'
                     onChange={onChangeUsername}
                     value={username}
                     placeholder='username'
                     errorMessage={isValidUsername}
                     labelText='username'
                     isValidInput={
                        apiError
                           ? !apiError.includes('username')
                           : usernameEmptyMessage
                           ? false
                           : true
                     }
                  />
                  <InputField
                     type='password'
                     onChange={onChangePassword}
                     value={password}
                     placeholder='password'
                     errorMessage={isValidPassword}
                     labelText='password'
                     isValidInput={
                        apiError
                           ? !apiError.includes('password')
                           : passwordEmptyMessage
                           ? false
                           : true
                     }
                  />
                  <Button
                     className='mt-2'
                     type='submit'
                     value='Sign In'
                     onClick={onUserSubmit}
                     apiStatus={apiStatus}
                     disabled={networkErrorMessage ? true : false}
                  />
               </FormTag>
               {networkErrorMessage ? this.notifyNetworkError() : null}
               <ToastContainer
                  position='bottom-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
               />
            </FormContainer>
         </SignInFormContainer>
      )
   }
}

export default SignInForm
