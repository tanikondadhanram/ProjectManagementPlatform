import React from 'react'
import Loader from 'react-loader-spinner'

interface ReactLoaderSpinnerProps {
   type: string
   color: string
   height: number
   width: number
}

export const ReactLoaderSpinner = (props: ReactLoaderSpinnerProps) => {
   return <Loader {...props} />
}
