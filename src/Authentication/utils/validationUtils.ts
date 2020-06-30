interface ValidationObject {
   shouldShowError: boolean
   errorMessage: string
}

export const validateUsername = (name: string): ValidationObject => {
   return { shouldShowError: true, errorMessage: 'please enter username' }
}
