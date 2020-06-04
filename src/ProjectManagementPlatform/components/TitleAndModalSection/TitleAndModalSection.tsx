import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import ReactModel from 'react-modal'

import { Div, ProjectTitle, CreateProjectButton } from './styledComponents'

@observer
class TitleAndModalSection extends Component<any, any> {
   @observable isOpen: boolean = false

   @action.bound
   toggleModal() {
      this.isOpen = !this.isOpen
   }

   render() {
      const {
         title,
         buttonText,
         modalContent: ModalContent,
         customStyles
      } = this.props

      return (
         <Div>
            <ProjectTitle>{title}</ProjectTitle>
            <CreateProjectButton onClick={this.toggleModal}>
               {buttonText}
            </CreateProjectButton>
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

export default TitleAndModalSection
