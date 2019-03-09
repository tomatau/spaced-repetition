import React, { Component } from 'react'
import TokenService from '../services/token-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
})

export default UserContext

export class UserProvider extends Component {
  state = {
    user: {},
    error: null,
  };

  setUser = () => {
    const jwtPayload = TokenService.parseAuthToken()
    if (jwtPayload) {
      this.setState({
        user: {
          id: jwtPayload.user_id,
          name: jwtPayload.name,
          username: jwtPayload.sub,
        },
      })
    }
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  componentDidMount() {
    this.setUser()
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
