import React, { Component } from 'react'

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
   render() {
      const {
         username,
         password,
         onChangeUsername,
         onChangePassword,
         onUserSubmit,
         apiStatus,
         errorMessage
      } = this.props

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
                     className='p-3'
                     type='text'
                     onChange={onChangeUsername}
                     value={username}
                     placeholder='username'
                     errorMessage={errorMessage}
                     labelText='username'
                     isValidInput={!errorMessage.includes('username')}
                  />
                  <InputField
                     className='p-3'
                     type='password'
                     onChange={onChangePassword}
                     value={password}
                     placeholder='password'
                     errorMessage={errorMessage}
                     labelText='password'
                     isValidInput={!errorMessage.includes('password')}
                  />
                  <Button
                     type='submit'
                     value='Sign In'
                     onClick={onUserSubmit}
                     apiStatus={apiStatus}
                  />
               </FormTag>
            </FormContainer>
         </SignInFormContainer>
      )
   }
}

export default SignInForm
