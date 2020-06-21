import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { ToastContainer } from 'react-toastify'

import stringConstants from '../../strings/stringConstants.json'

import { Header } from '../Header'
import { TitleAndModalSection } from '../TitleAndModalSection'
import { CreateTaskForm } from '../CreateTaskForm'
import { ListOfTasks } from '../ListOfTasks'

@observer
class ProjectTasks extends Component<any, any> {
   render() {
      const createTaskProps = {
         shouldHaveGoBackButton: true,
         modalContent: CreateTaskForm,
         title: stringConstants['listOfTasks'],
         buttonText: stringConstants['addTask'],
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

      const { tasksStore } = this.props

      const { listOfTasks, apiStatus, apiError, getListOfTasks } = tasksStore

      const listOfTasksProps = {
         listOfTasks,
         getListOfTasks,
         apiStatus,
         apiError
      }

      return (
         <>
            <Header />

            <TitleAndModalSection {...createTaskProps} />

            <ListOfTasks {...listOfTasksProps} />

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

export default ProjectTasks
