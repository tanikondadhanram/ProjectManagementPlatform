import React from 'react'
import Button from './Button'
import { text, withKnobs, number } from '@storybook/addon-knobs'

export default {
   component: Button,
   title: 'CommonComponents/CommonButton'
}

export const buttonWithText = () => (
   <Button apiStatus={number('apiStatus')} value={text('value', 'Click Me')} />
)

buttonWithText.story = {
   decorators: [withKnobs]
}
