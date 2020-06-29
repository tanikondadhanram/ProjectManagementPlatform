import React, { Component } from 'react'

<<<<<<< HEAD:src/Common/components/SvgComponent/index.tsx
class SvgComponent extends Component<any> {
=======
interface SvgComponentProps {
   renderComponent: Function
   className?: string
}

class SvgComponent extends Component<SvgComponentProps> {
>>>>>>> a2bfdb1... typescript:src/Common/components/SvgComponent/index.js
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
