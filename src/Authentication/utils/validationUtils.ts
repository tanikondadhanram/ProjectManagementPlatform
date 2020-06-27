interface ValidationObject {
   shouldShowError: boolean
   errorMessage: string
}

export const validateUsername = (name: string): ValidationObject => {
   switch (Boolean(name)) {
      case name.length === 0:
         return { shouldShowError: true, errorMessage: 'please enter username' }

      case name.length < 3:
         return {
            shouldShowError: true,
            errorMessage: 'username should be greater than 3 characters'
         }

      case name.length > 20:
         return {
            shouldShowError: true,
            errorMessage: 'username should be less than than 20 characters'
         }

      default:
         throw new Error('invalid username')
   }
}
