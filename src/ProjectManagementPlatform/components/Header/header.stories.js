import React from 'react'
import { withRouter } from 'react-router-dom'

import { Header } from '.'

export default { component: Header, title: 'Project Header' }

export const projectHeader = () => withRouter(<Header />)
