import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const Container = styled.div`
   ${tw`m-6 flex flex-col`}
`

export const CloseProjectModal = styled.button`
   ${tw`h-10 w-10 text-2xl text-white flex justify-center items-center rounded cursor-pointer focus:outline-none self-end`};
   background-color: ${colors['bright-blue']};
`

export const FormHeading = styled.h1`
   ${tw`self-center my-3 text-2xl`}
`

export const FormTag = styled.form`
   ${tw``}
`

export const FeildContainer = styled.div`
   ${tw`my-3`}
`

export const Label = styled.label`
   ${tw``}
`
