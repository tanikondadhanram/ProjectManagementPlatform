import React, { Component } from 'react'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import ReactPaginate from 'react-paginate'

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

   render() {
      const {
         maxPages,
         navigateToClickedPage,
         listOfProjects
      } = this.props.projectManagementPlatformStore

      if (maxPages === 0 || listOfProjects.length === 0) {
         return null
      }

      return (
         <PaginationContainer>
            <ReactPaginate
               pageCount={maxPages}
               pageRangeDisplayed={1}
               marginPagesDisplayed={2}
               previousLabel={previousLabel}
               nextLabel={nextLabel}
               containerClassName='flex'
               previousClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               nextClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               pageClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               breakClassName=' text-xl h-8 w-8 flex justify-center items-center outline-none'
               previousLinkClassName='focus:outline-none'
               nextLinkClassName='focus:outline-none'
               pageLinkClassName='focus:outline-none'
               activeLinkClassName='bg-blue-500 h-full w-full text-white flex justify-center items-center'
               onPageChange={navigateToClickedPage}
            />
         </PaginationContainer>
      )
   }
}

const previousLabel = <span>&lt;</span>
const nextLabel = <span>&gt;</span>

export default Pagination
