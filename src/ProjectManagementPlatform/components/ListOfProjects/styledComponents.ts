import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const ListOfProjectsContainer = styled.div`
   ${tw`mx-20 my-10`}
`

export const ListOfProjectsTable = styled.div`
   ${tw`border-2  w-full `}
`

export const TableHeader = styled.div`
   ${tw`w-full flex justify-between items-center border-b font-semibold`};
   background-color: ${colors['lightBlueGrey']};
`

export const TableHeaderData = styled.div`
   ${tw` m-8 `}
`
