import React, { Component } from 'react'


interface SvgComponentProps {
   renderComponent: Function
   className?: string
}

class SvgComponent extends Component<SvgComponentProps> {

   render() {
      const {
         renderComponent: RenderComponent,
         className,
         ...other
      } = this.props
      return (
         <span className={className}>
            <RenderComponent {...other} />
         </span>
      )
   }
}

export default SvgComponent
