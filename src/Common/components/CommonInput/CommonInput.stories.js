import React from 'react'
import InputField from './CommonInput'
import { withKnobs, text } from '@storybook/addon-knobs'

export default {
   component: InputField,
   title: 'CommonComponents/InputFieldComponents'
}

export const ValidInputField = () => (
   <InputField isValidInput={true} value={text('value')} />
)

ValidInputField.story = {
   decorators: [withKnobs]
}

export const inValidInputField = () => (
   <InputField isValidInput={false} value={text('value')} />
)

inValidInputField.story = {
   decorators: [withKnobs]
}
