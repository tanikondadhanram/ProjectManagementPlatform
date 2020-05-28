import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const HeaderContainer = styled.div`
   ${tw`flex justify-between items-center w-screen`};
   border-bottom: 1px solid ${colors['lightBlueGrey']};
   background-color: ${colors['white']};
`

export const LogoAndHeadingContainer = styled.div`
   ${tw`flex items-center`}
`

export const IbHubsLogo = styled.img`
   ${tw`mx-2`};
   width: 90px;
   height: 90px;
   object-fit: contain;
`

export const ProjectHeading = styled.h1`
   ${tw`text-3xl`}
`

export const UsernameAndProfileIconContainer = styled.div`
   ${tw`flex items-center`}
`

export const UsernameText = styled.h1`
   ${tw`text-2xl`}
`

export const ProfileDropdown = styled.img`
   ${tw`h-16 w-16 border rounded-full`}
`

export const SignOutButton = styled.button`
   ${tw`text-2xl border focus:outline-none`}
`
