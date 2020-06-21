import styled from '@emotion/styled'
import tw from 'tailwind.macro'

type CardWrapperProps = {
   isClickable: boolean
}

export const CardWrapper = styled.div`
   ${tw``};
   cursor: ${(props: CardWrapperProps) =>
      props.isClickable ? 'pointer' : 'none'};
`

export const CardTitle = styled.h1`
   ${tw``}
`
