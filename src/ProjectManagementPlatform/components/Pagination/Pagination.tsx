import React, { Component } from 'react'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'

import { PaginationButton } from '../PaginationButton'

import { PaginationContainer } from './styledComponents'

@inject('projectManagementPlatformStore')
@observer
class Pagination extends Component<any, any> {
   componentWillUnmount() {
      this.paginationReaction()
   }

   paginationReaction = reaction(
      () => {
         const { projectManagementPlatformStore } = this.props
         const { paginationOffset } = projectManagementPlatformStore
         return paginationOffset
      },
      number => {
         const { projectManagementPlatformStore } = this.props
         const { getProjects } = projectManagementPlatformStore
         getProjects()
      }
   )

   renderPaginationButtons = () => {
      const {
         navigateToClickedPage,
         maxPages
      } = this.props.projectManagementPlatformStore

      const paginationsButtons: any = []
      for (let index = 1; index <= maxPages; index++) {
         paginationsButtons.push(
            <PaginationButton
               key={index.toString()}
               value={index}
               onClick={navigateToClickedPage}
            />
         )
      }

      return paginationsButtons
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
               value='&lt;'
            />

            {this.renderPaginationButtons()}
            <PaginationButton
               onClick={incerementPaginationValues}
               disabled={pageNumber === maxPages ? true : false}
               value='&gt;'
            />
         </PaginationContainer>
      )
   }
}

export default Pagination
{
   /* <PaginationButton onClick={this.onPageNumberClick} value='1'>
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
            </PaginationButton> */
}
