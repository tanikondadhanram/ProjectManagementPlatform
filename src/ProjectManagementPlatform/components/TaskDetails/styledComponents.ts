import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const TableBody = styled.tbody`
   ${tw`w-full text-center`};
   background-color: ${(props: any) =>
      props.id % 2 ? colors['lightBlueGrey'] : colors['white']};
`

export const TableData = styled.td`
   ${tw`h-20
   `}
`

export const TableRow = styled.tr`
   ${tw`w-full`}
`

export const IbHubsLogo = styled.img`
   ${tw`border rounded-full h-12 w-12 object-contain 
   `}
`

export const UserDetails = styled.div`
   ${tw`flex  justify-center items-center`}
`
