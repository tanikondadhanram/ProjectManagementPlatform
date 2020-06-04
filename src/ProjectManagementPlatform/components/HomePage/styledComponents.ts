import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const ProjectManagementAppContainer = styled.div`
   ${tw``};
   background-color: ${colors['whiteTwo']};
   opacity: ${(props: any) => (props.showPopUp ? '10' : '10')};
`
