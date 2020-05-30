import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { IB_HUBS_LOGO_PATH } from '../../constants/logosPaths'

import {
   HeaderContainer,
   IbHubsLogo,
   ProjectHeading,
   LogoAndHeadingContainer,
   UsernameAndProfileIconContainer,
   UsernameText,
   ProfileDropdown,
   SignOutButton
} from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'
import { clearUserSession } from '../../../utils/StorageUtils'
import { PROJECT_SIGN_IN_PATH } from '../../../Authentication/constants/routeConstants'

class Header extends Component<any, any> {
   onSignOut = () => {
      clearUserSession()
      const { history } = this.props
      history.replace(PROJECT_SIGN_IN_PATH)
   }

   render() {
      return (
         <HeaderContainer>
            <LogoAndHeadingContainer>
               <IbHubsLogo
                  src={IB_HUBS_LOGO_PATH}
                  alt={stringConstants['ibLogoAltText']}
               />
               <ProjectHeading>
                  {stringConstants['ProjectTitle']}
               </ProjectHeading>
            </LogoAndHeadingContainer>
            <UsernameAndProfileIconContainer>
               <UsernameText>Satya</UsernameText>
               <ProfileDropdown src={IB_HUBS_LOGO_PATH} />
               <SignOutButton onClick={this.onSignOut}>
                  {stringConstants['sign out']}
               </SignOutButton>
            </UsernameAndProfileIconContainer>
         </HeaderContainer>
      )
   }
}

export default withRouter(Header)
