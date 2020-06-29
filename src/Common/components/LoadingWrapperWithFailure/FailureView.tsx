import React from 'react'
import { observer } from 'mobx-react'

import {
   FailureViewContainer,
   FailureViewMessage,
   RetryButton
} from './styledComponents'

interface FailureViewProps {
   onRetryClick: () => void
   errorMessage: string
}

@observer
<<<<<<< HEAD:src/Common/components/LoadingWrapperWithFailure/FailureView.tsx
class FailureView extends React.Component<any> {
=======
class FailureView extends React.Component<FailureViewProps> {
>>>>>>> a2bfdb1... typescript:src/Common/components/LoadingWrapperWithFailure/FailureView.js
   render() {
      const { onRetryClick, errorMessage } = this.props

      return (
         <FailureViewContainer>
            <FailureViewMessage>{errorMessage}</FailureViewMessage>
            <RetryButton onClick={onRetryClick}>Retry</RetryButton>
         </FailureViewContainer>
      )
   }
}

export default FailureView
