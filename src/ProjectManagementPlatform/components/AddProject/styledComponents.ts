import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const AddProjectContainer = styled.div`
   ${tw`w-1/3 z-10 absolute`};
   background-color: ${colors['ice-blue']};
   height: 80%;
   top: 15%;
   left: 35%;
`

export const AddProjectForm = styled.form`
   ${tw`w-full p-12`}
`

export const TextAreaField = styled.textarea`
   ${tw`outline-none h-32 w-full`}
`

export const Label = styled.label`
   ${tw`font-bold text-base font-sans`}
`

export const Div = styled.div`
   ${tw` flex flex-col`}
`

export const OptionTag = styled.option`
   ${tw``}
`

export const WorkFLowTypes = styled.select`
   ${tw`h-12`}
`

export const ProjectFLowTypes = styled.select`
   ${tw`h-12`}
`

export const ErrorMessage = styled.p`
   ${tw``};
   color: ${(props: any) =>
      props.visible ? colors['neon-red'] : colors['ice-blue']};
`

export const InputTag = styled.input`
   ${tw`w-full h-12 outline-none`}
`
