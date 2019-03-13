import config from '../config'
import TokenService from './token-service'

const ListApiService = {
  getLists() {
    return fetch(`${config.API_ENDPOINT}/list/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  getHead(listId) {
    return fetch(`${config.API_ENDPOINT}/list/${listId}/head`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  postGuess(listId, guess) {
    return fetch(`${config.API_ENDPOINT}/list/${listId}/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ guess })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
}

export default ListApiService
