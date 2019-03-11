import React, { Component } from 'react'
import TokenService from '../services/token-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  loadUserFromToken: () => { },
})

export default UserContext

export class UserProvider extends Component {
  state = {
    user: {},
    error: null,
  };

  setUser = user => {
    this.setState({ user })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  loadUserFromToken = () => {
    const jwtPayload = TokenService.parseAuthToken()
    if (jwtPayload) {
      this.setUser({
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      })
    }
  }

  componentDidMount() {
    this.loadUserFromToken()
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      loadUserFromToken: this.loadUserFromToken,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
