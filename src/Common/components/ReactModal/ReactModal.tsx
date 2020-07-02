import React, { Component } from 'react'
import Modal from 'react-modal'

interface ReactModalProps extends Modal {
   isOpen: boolean
}

class ReactModal extends Component<ReactModalProps> {
   render() {
      return (
         <Modal
            style={{
               content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)'
               }
            }}
            {...this.props}
         />
      )
   }
}

export default ReactModal
