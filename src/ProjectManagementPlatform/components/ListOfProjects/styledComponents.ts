import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const ListOfProjectsTable = styled.table`
   ${tw`border-2  m-auto mt-16 w-11/12`}
`

export const TableHeader = styled.thead`
   ${tw`w-full p-12`};
   background-color: ${colors['white']};
`

export const TableHeaderData = styled.th`
   ${tw``}
`

export const TableRow = styled.tr`
   ${tw``}
`

export const TableData = styled.td`
   ${tw``}
`
