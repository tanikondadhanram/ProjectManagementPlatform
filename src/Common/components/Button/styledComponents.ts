import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/colors'

export const CommonButton = styled.button`
   ${tw`text-white focus:outline-none flex justify-center items-center`};
   width: 320px;
   height: 40px;
   border-radius: 4px;
   background-color: ${colors['bright-blue']};
`
