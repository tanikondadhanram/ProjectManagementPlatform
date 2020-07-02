import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/colors'

export const InputFieldContainer = styled.div`
   ${tw`flex flex-col mb-2 h-24 w-full `}
`

export const InputFieldTag = styled.input`
   ${tw`outline-none my-2 p-3 w-full h-12 border-2 text-base`};
   border-radius: 2px;
   border: solid 1px
      ${(props: any) =>
         props.isValidInput ? `${colors['steel']}` : `${colors['neon-red']}`};
   background-color: ${(props: any) =>
      props.isValidInput ? `${colors['white']}` : `${colors['neon-red-5']}`};
   color: ${colors['dark-blue-grey']};
   font-family: HKGrotesk;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
`

export const LabelForInputField = styled.label`
   ${tw` w-full text-sm`};
   width: 63px;
   height: 16px;
   font-family: HKGrotesk;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: 0.12px;
`

export const ErrorMessage = styled.p`
   ${tw`w-full text-base`};
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
   ${tw`w-full flex`}
`

export const ErrorIcon = styled.div`
   ${tw`-ml-8 mt-6`};
`
