import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import SignInForm from './SignInForm'
import { action } from '@storybook/addon-actions'

export default {
   component: SignInForm,
   title: 'SignInForm'
}
const authStore = {
   username: text('username', 'rk'),
   password: text('password', 'rk'),
   onChangeUsername: action('onChangeUsername'),
   onChangePassword: action('onChangePassword'),
   onUserSubmit: action('onUserSubmit'),
   apiStatus: number('apiStatus', 0),
   errorMessage: text('errorMessage', 'password error')
}

export const signInForm = () => <SignInForm {...authStore} />

signInForm.story = {
   decorators: [withKnobs]
}
