import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const TableBody = styled.div`
   ${tw`border flex  justify-between items-center `};
   background-color: ${(props: any) =>
      props.id % 2 ? colors['white'] : colors['lightBlueGrey']};
`

export const TableData = styled.div`
   ${tw`mx-6 my-5`}
`
export const IbHubsLogo = styled.img`
   ${tw`border rounded-full h-12 w-12 object-contain`}
`
