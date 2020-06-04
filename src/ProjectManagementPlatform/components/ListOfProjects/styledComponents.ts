import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const ListOfProjectsContainer = styled.div`
   ${tw`m-auto`};
   width: 85%;
`

export const ListOfProjectsTable = styled.table`
   ${tw`w-full `}
`

export const TableHeader = styled.thead`
   ${tw`w-full font-semibold`};
   background-color: ${colors['lightBlueGrey']};
`

export const TableRow = styled.tr`
   ${tw`w-full`}
`

export const TableHeaderData = styled.th`
   ${tw`h-20 `}
`
