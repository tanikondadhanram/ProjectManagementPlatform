export const getUserDetails = () => {
   let userDetails: any = window.localStorage.getItem('userDetails')

   userDetails = JSON.parse(JSON.parse(userDetails))

   return userDetails
}
