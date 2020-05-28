import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { PaginationContainer, PaginationButton } from './styledComponents'

@inject('projectManagementPlatformStore')
@observer
class Pagination extends Component<any, any> {
   onPageNumberClick = event => {
      console.log(event.target.value)

      this.props.projectManagementPlatformStore.navigateToClickedPage(
         Number(event.target.value)
      )
   }
   render() {
      const {
         incerementPaginationValues,
         decerementPaginationValues,
         pageNumber,
         maxPages
      } = this.props.projectManagementPlatformStore

      return (
         <PaginationContainer>
            <PaginationButton
               onClick={decerementPaginationValues}
               disabled={pageNumber === 1 ? true : false}
            >
               &lt;
            </PaginationButton>
            <PaginationButton onClick={this.onPageNumberClick} value='1'>
               1
            </PaginationButton>
            <PaginationButton onClick={this.onPageNumberClick} value='2'>
               2
            </PaginationButton>
            <PaginationButton onClick={this.onPageNumberClick} value='3'>
               3
            </PaginationButton>
            <PaginationButton onClick={this.onPageNumberClick} value='4'>
               4
            </PaginationButton>
            <PaginationButton onClick={this.onPageNumberClick} value='5'>
               5
            </PaginationButton>
            <PaginationButton
               onClick={incerementPaginationValues}
               disabled={pageNumber === 5 ? true : false}
            >
               &gt;
            </PaginationButton>
         </PaginationContainer>
      )
   }
}

export default Pagination
