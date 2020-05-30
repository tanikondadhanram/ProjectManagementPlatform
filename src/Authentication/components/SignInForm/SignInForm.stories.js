import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { SignInForm } from '.'

export default {
   component: SignInForm,
   title: 'SignInForm'
}

export const signInForm = () => (
   <SignInForm
      username={text('username', 'rk')}
      password={text('password', 'rk')}
      onChangeUsername={action('onChangeUsername')}
      onChangePassword={action('onChangePassword')}
      onUserSubmit={action('onUserSubmit')}
      apiStatus={number('apiStatus', 0)}
      apiError={text('ApiError', null)}
      usernameEmptyMessage={text('username Error', 'please enter username')}
      passwordEmptyMessage={text('password Error', 'please enter password')}
      errorMessage={text('errorMessage', 'password error')}
   />
)

signInForm.story = {
   decorators: [withKnobs]
}
