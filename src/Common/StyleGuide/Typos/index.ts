import styled from '@emotion/styled'
import { colors } from '../../themes/colors'
import tw from 'tailwind.macro'

export const Typo14DarkBlueGreyHKGroteskRegular = styled.input`
   ${tw`m-6`};
   width: 320px;
   height: 40px;
   border-radius: 2px;
   border: solid 1px ${colors['steel']};
   background-color: ${colors['white']};
   color: ${colors['dark-blue-grey']};
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
`
