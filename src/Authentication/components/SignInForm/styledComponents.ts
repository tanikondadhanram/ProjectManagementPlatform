import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const SignInFormContainer = styled.div`
   ${tw`h-screen w-screen flex justify-center items-center`}
   background-color: ${colors['ice-blue']};
`

export const FormContainer = styled.div`
   ${tw`flex flex-col justify-center items-center`};
   background-color: ${colors['white']};
   height: 70%;
   width: 30%;
`

export const IbHubsLogo = styled.img`
   ${tw`m-4`};
   width: 90px;
   height: 90px;
   object-fit: contain;
`

export const SignInFormHeading = styled.h1`
   ${tw`text-3xl`};
   color: ${colors['dark-blue-grey']};
`

export const FormTag = styled.form`
   ${tw`flex flex-col justify-center items-center `};
   height: 80%;
   width: 70%;
`

export const NetworkErrorMessage = styled.p`
   ${tw`text-xl `};
   color: ${colors['neon-red']};
`
