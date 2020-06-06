import React, { Component } from 'react'

import { observer } from 'mobx-react'

import ReactPaginate from 'react-paginate'

import { PaginationContainer } from './styledComponents'
import { reaction } from 'mobx'

@observer
class Pagination extends Component<any, any> {
   componentWillUnmount() {
      this.paginationReaction()
   }

   paginationReaction = reaction(
      () => this.props.offset,
      offset => this.props.getPages()
   )

   render() {
      const { maxPages, navigateToClickedPage } = this.props
      return (
         <PaginationContainer>
            <ReactPaginate
               pageCount={maxPages}
               pageRangeDisplayed={2}
               marginPagesDisplayed={2}
               previousLabel={previousLabel}
               nextLabel={nextLabel}
               onPageChange={navigateToClickedPage}
               containerClassName='flex'
               previousClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               nextClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               pageClassName='border text-2xl h-8 w-8 m-1 flex justify-center items-center'
               breakClassName=' text-xl h-8 w-8 flex justify-center items-center outline-none'
               previousLinkClassName='focus:outline-none'
               nextLinkClassName='focus:outline-none'
               pageLinkClassName='focus:outline-none'
               activeLinkClassName='bg-blue-500 h-full w-full text-white flex justify-center items-center'
            />
         </PaginationContainer>
      )
   }
}

const previousLabel = <span>&lt;</span>
const nextLabel = <span>&gt;</span>

export default Pagination
