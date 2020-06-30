import React from 'react'
import { render } from '@testing-library/react'
import InputField from './CommonInput'

describe('Test Cases For Common Component Input Field', () => {
   it('Should Test Input Field Rendered', () => {
      const { getByDisplayValue } = render(
         <InputField
            isValidInput={true}
            value={'RamaKrishna'}
            onChange={() => alert('hi')}
         />
      )
      getByDisplayValue('RamaKrishna')
   })

   it('Should Test Error Message Displayed', () => {
      const { getByText } = render(
         <InputField
            isValidInput={false}
            value={'RamaKrishna'}
            onChange={() => alert('hi')}
            errorMessage='invalid username'
         />
      )
      getByText('invalid username')
   })
})
