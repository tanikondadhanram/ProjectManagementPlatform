import React from 'react'
import { render } from '@testing-library/react'

import { ReactSelect } from '.'

describe('React Select Tests', () => {
   it('Should Test value prop in Select', () => {
      const { getByText } = render(
         <ReactSelect value={{ label: 'Option', value: 'value' }} />
      )

      getByText('Option')
   })

   it('Should Test PlaceholderProp in Select', () => {
      const { getByText } = render(<ReactSelect placeholder='placeholder' />)

      getByText('placeholder')
   })
})
