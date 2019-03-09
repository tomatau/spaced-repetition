import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        return res
      })
  },
}

export default AuthApiService
