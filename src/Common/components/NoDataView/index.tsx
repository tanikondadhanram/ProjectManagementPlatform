import React from 'react'

import { NoDataViewContainer, NoDataViewText } from './styledComponents'

class NoDataView extends React.Component {
   render() {
      return (
         <NoDataViewContainer>
            <NoDataViewText>No data found!</NoDataViewText>
            {/* <video width='400' height='400' autoPlay>
               <source
                  src='C:\Users\ramakrishna\Desktop\react-repos\tap-mini-project\src\Common\components\NoDataView\VID20200505223949.mp4'
                  type='video/mp4'
               />
            </video> */}
         </NoDataViewContainer>
      )
   }
}

export default NoDataView
