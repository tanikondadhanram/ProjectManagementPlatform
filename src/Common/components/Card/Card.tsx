import React, { Component } from 'react'

import { CardWrapper, CardTitle } from './styledComponents'

type CardProps = {
   children: object
   onClick?: Function
   title?: string
}

class Card extends Component<CardProps> {
   renderTitle = () => {
      const { title } = this.props
      return title ? <CardTitle>{title}</CardTitle> : null
   }

   render() {
      const { children, onClick } = this.props
      const isClickable = onClick ? true : false
      return (
         <CardWrapper isClickable={isClickable}>
            {this.renderTitle()}
            {children}
         </CardWrapper>
      )
   }
}

export default Card
