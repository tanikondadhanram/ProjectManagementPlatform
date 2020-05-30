import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const Button = styled.button`
   ${tw`border focus:outline-none text-2xl mx-2 h-12 w-12 rounded`};
   background-color: ${colors['lightBlueGrey']};
`
