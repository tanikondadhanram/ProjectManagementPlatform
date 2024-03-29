import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../Common/themes/colors'

export const HeaderContainer = styled.div`
   ${tw`flex justify-between  items-center w-full px-4`};
   border-bottom: 1px solid ${colors['lightBlueGrey']};
   background-color: ${colors['white']};
`

export const LogoAndHeadingContainer = styled.div`
   ${tw`flex  items-center`}
`

export const IbHubsLogo = styled.img`
   ${tw``};
   width: 90px;
   height: 90px;
   object-fit: contain;
`

export const ProjectHeading = styled.h1`
   ${tw`text-2xl`}
`

export const UsernameAndProfileIconContainer = styled.div`
   ${tw` flex  items-center cursor-pointer`}
`

export const UsernameText = styled.h1`
   ${tw`text-2xl`}
`

export const ProfileDropdown = styled.img`
   ${tw`h-16 w-16 border rounded-full`}
`

export const SignOutButton = styled.button`
   ${tw`text-xl text-white h-12 w-32 rounded focus:outline-none`};
   background-color: ${colors['bright-blue']};
`
