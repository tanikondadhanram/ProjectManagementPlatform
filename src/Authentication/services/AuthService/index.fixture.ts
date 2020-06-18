import userData from '../../fixtures/userData.json'

class AuthFixtureService {
   signInAPI = () =>
      new Promise(resolve => setTimeout(() => resolve(userData), 2000))
}

export { AuthFixtureService }
