export interface SignInAPIResponse {
   access_token: string
   refresh_token: string
   expires_in: number
   is_admin: boolean
   profile_pic: string
   name: string
}

export interface SignInAPIRequestObject {
   username: string
   password: string
}
