import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const CreateProjectContainer = styled.div`
   ${tw`mx-20 my-10 flex justify-between items-center`}
`

export const ProjectTitle = styled.h1`
   ${tw`text-3xl`};
   color: ${colors['bright-blue']};
`

export const CreateProjectButton = styled.button`
   ${tw`h-10 w-32 text-white flex justify-center items-center rounded cursor-pointer focus:outline-none`};
   background-color: ${colors['bright-blue']};
`

export const CloseProjectModal = styled.button`
   ${tw`h-10 w-10 text-2xl text-white flex justify-center items-center rounded cursor-pointer focus:outline-none self-end`};
   background-color: ${colors['bright-blue']};
`

export const Label = styled.label`
   ${tw`my-2`}
`
export const InputField = styled.input`
   ${tw`my-2 w-full h-10 p-2 outline-none`};
   border: 1px solid
      ${(props: any) => (props.isError ? colors['neon-red'] : colors['steel'])};
   background-color: ${(props: any) =>
      props.isError ? colors['neon-red-5'] : colors['white']};
`

export const ErrorMessage = styled.span`
   ${tw`my-2`};
   color: ${(props: any) =>
      props.isError ? colors['neon-red'] : colors['white']};
`

export const TextArea = styled.textarea`
   ${tw`w-full h-32 border focus:outline-none`};
   border: 1px solid
      ${(props: any) => (props.isError ? colors['neon-red'] : colors['steel'])};
   background-color: ${(props: any) =>
      props.isError ? colors['neon-red-5'] : colors['white']};
`

export const OptionTag = styled.option`
   ${tw``};
`
export const ConfirmProjectButton = styled.button`
   ${tw`h-10 w-32 m-auto text-white  rounded focus:outline-none`};
   background-color: ${colors['bright-blue']};
`
