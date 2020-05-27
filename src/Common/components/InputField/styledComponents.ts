import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/colors'

export const InputFieldContainer = styled.div`
   ${tw`flex flex-col mb-3`};
`

export const InputFeildTag = styled.input`
   ${tw`my-3 outline-none mt-3`};
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

export const LabelForInputFeild = styled.label`
   ${tw` `};
   width: 63px;
   height: 16px;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: 0.12px;
`

export const ErrorMessage = styled.p`
   ${tw``};
   width: 124px;
   height: 16px;
   font-family: HKGrotesk;
   font-size: 12px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: normal;
   color: ${colors['neon-red']};
`
export const InputAndErrorMessageContainer = styled.div`
   ${tw`flex relative z-40`}
`

export const ErrorIcon = styled.span`
   ${tw`relative`};
   right: 30px;
   top: 20px;
`
