import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactModal from 'react-modal'

import { IB_HUBS_LOGO_PATH } from '../../constants/ImagesPaths'

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

import { PROJECT_SIGN_IN_PATH } from '../../../Authentication/constants/routeConstants'

import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Header extends Component<any, any> {
   @observable isOpen: boolean = false

   @action.bound
   toggleModal() {
      this.isOpen = !this.isOpen
   }

   onSignOut = () => {
      const { history } = this.props
      history.replace(PROJECT_SIGN_IN_PATH)

      this.toggleModal()
      toast.success('successfully logged out')
   }

   render() {
      let userDetails: any = window.localStorage.getItem('userDetails')

      userDetails = JSON.parse(JSON.parse(userDetails))
      // console.log(userDetails)

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
            <UsernameAndProfileIconContainer onClick={this.toggleModal}>
               <UsernameText>{userDetails.username}</UsernameText>
               <ProfileDropdown src={userDetails.profile_pic} />
            </UsernameAndProfileIconContainer>
            <ReactModal
               isOpen={this.isOpen}
               style={{
                  content: {
                     left: '70%',
                     height: '50%'
                  }
               }}
               ariaHideApp={false}
            >
               <div className='flex flex-col'>
                  <button
                     className='self-end text-xl text-white bg-blue-500 h-12 w-12 rounded'
                     onClick={this.toggleModal}
                  >
                     &times;
                  </button>
                  <div className='self-center flex items-center justify-between text-2xl'>
                     <label>username : </label>
                     <UsernameText>{userDetails.username}</UsernameText>
                  </div>
                  <ProfileDropdown
                     className='self-center my-6'
                     src={userDetails.profile_pic}
                  />
                  <SignOutButton
                     className='self-center'
                     onClick={this.onSignOut}
                  >
                     {stringConstants['sign out']}
                  </SignOutButton>
               </div>
            </ReactModal>
         </HeaderContainer>
      )
   }
}

export default withRouter(Header)
