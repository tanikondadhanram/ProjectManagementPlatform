import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { ToastContainer } from 'react-toastify'

import stringConstants from '../../strings/stringConstants.json'

import { Header } from '../Header'
import { ListOfProjects } from '../ListOfProjects'
import { Pagination } from '../Pagination'
import { TitleAndModalSection } from '../TitleAndModalSection'
import { CreateProjectForm } from '../CreateProjectForm'

@observer
class HomePage extends Component<any, any> {
   render() {
      const { projectManagementPlatformStore } = this.props

      const {
         maxPages,
         navigateToClickedPage,
         listOfProjects,
         offset,
         getProjects
      } = projectManagementPlatformStore

      const createProjectProps = {
         shouldHaveGoBackButton: false,
         modalContent: CreateProjectForm,
         title: stringConstants['ProjectTitle'],
         buttonText: stringConstants['addNewProject'],
         customStyles: {
            content: {
               top: '50%',
               left: '50%',
               right: 'auto',
               bottom: 'auto',
               marginRight: '-50%',
               transform: 'translate(-50%, -50%)',
               width: '40%',
               height: '90%'
            }
         }
      }

      const paginationProps = {
         maxPages,
         navigateToClickedPage,
         offset,
         getPages: getProjects
      }

      const shouldShowPagination =
         listOfProjects.length === 0 || maxPages === 0 ? false : true

      return (
         <>
            <Header />
            <TitleAndModalSection {...createProjectProps} />
            <ListOfProjects />
            {shouldShowPagination ? <Pagination {...paginationProps} /> : null}
            <ToastContainer
               position='bottom-center'
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
         </>
      )
   }
}

export default HomePage
