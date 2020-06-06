import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import ReactModel from 'react-modal'
import { getUserDetails } from '../../utils/getUserDetails'

import { Div, ProjectTitle, CreateProjectButton } from './styledComponents'
import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../../constants/routeConstants'

@observer
class TitleAndModalSection extends Component<any, any> {
   @observable isOpen: boolean = false

   onGoBack = () => {
      const { history } = this.props
      history.replace(PROJECT_MANAGEMANT_PLATFORM_PATH)
   }

   @action.bound
   toggleModal() {
      this.isOpen = !this.isOpen
   }

   render() {
      const {
         title,
         buttonText,
         modalContent: ModalContent,
         customStyles,
         shouldHaveGoBackButton
      } = this.props

      const userDetails = getUserDetails()

      const { is_admin } = userDetails

      return (
         <Div>
            <ProjectTitle>{title}</ProjectTitle>
            {shouldHaveGoBackButton ? (
               <CreateProjectButton onClick={this.onGoBack}>
                  Back to projects
               </CreateProjectButton>
            ) : null}
            {is_admin || shouldHaveGoBackButton ? (
               <CreateProjectButton onClick={this.toggleModal}>
                  {buttonText}
               </CreateProjectButton>
            ) : null}
            <ReactModel
               isOpen={this.isOpen}
               style={customStyles ? customStyles : {}}
               ariaHideApp={false}
            >
               {<ModalContent toggleModal={this.toggleModal} />}
            </ReactModel>
         </Div>
      )
   }
}

export default withRouter(TitleAndModalSection)
