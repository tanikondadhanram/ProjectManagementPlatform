import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const Div = styled.div`
   ${tw`flex justify-between items-center`};
   padding: 3% 7.5%;
`

export const ProjectTitle = styled.h1`
   ${tw`text-2xl`};
   color: ${colors['bright-blue']};
`

export const CreateProjectButton = styled.button`
   ${tw`text-xl text-white h-12 w-40 rounded focus:outline-none`};
   background-color: ${colors['bright-blue']};
`
