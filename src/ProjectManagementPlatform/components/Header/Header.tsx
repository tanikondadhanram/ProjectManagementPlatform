import React, { Component } from 'react'

import { IB_HUBS_LOGO_PATH } from '../../constants/logosPaths'

import {
   HeaderContainer,
   IbHubsLogo,
   ProjectHeading,
   LogoAndHeadingContainer,
   UsernameAndProfileIconContainer,
   UsernameText,
   ProfileDropdown
} from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'

class Header extends Component {
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
            </UsernameAndProfileIconContainer>
         </HeaderContainer>
      )
   }
}

export default Header
