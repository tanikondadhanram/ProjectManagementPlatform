import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

describe('Common Component Button Test Cases', () => {
   it('Should Test Loader Is Rendering', () => {
      const { getByTestId } = render(<Button apiStatus={200} value='Sign In' />)
      getByTestId('loader')
   })
})
