import styled from '@emotion/styled'
import { colors } from '../../themes/colors'
// import tw from 'tailwind.macro'

export const Typo14DarkBlueGreyHKGroteskRegular = styled.input`
   width: 320px;
   height: 40px;
   border-radius: 2px;
   border: solid 1px
      ${(props: any) =>
         props.isValidInput ? `${colors['steel']}` : `${colors['neon-red']}`};
   background-color: ${(props: any) =>
      props.isValidInput ? `${colors['white']}` : `${colors['neon-red-5']}`};
   color: ${(props: any) =>
      props.isValidInput
         ? `${colors['dark-blue-grey']}`
         : `${colors['neon-red']}`};
   font-family: HKGrotesk;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
`
