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
