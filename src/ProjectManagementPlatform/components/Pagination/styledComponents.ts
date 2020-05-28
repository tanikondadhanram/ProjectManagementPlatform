import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const PaginationContainer = styled.div`
   ${tw`m-12 flex justify-center items-center`}
`

export const PaginationButton = styled.button`
   ${tw`border focus:outline-none text-2xl mx-2`}
`

export const PaginationText = styled.p`
   ${tw`border text-2xl mx-2`}
`
