import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/colors'

export const CommonButton = styled.button`
   ${tw`text-white w-full focus:outline-none flex justify-center items-center h-12`};
   border-radius: 4px;
   background-color: ${colors['bright-blue']};
`
