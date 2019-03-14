import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import IdleService from '../../services/idle-service'
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import ListListRoute from '../../routes/ListListRoute/ListListRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'

class App extends Component {
  state = { hasError: false }
    // IdleService.setIdleCallback(this.logoutFromIdle)

  // componentDidMount() {
  //   if (TokenService.hasAuthToken()) {
  //     IdleService.regiserIdleTimerResets()
  //     TokenService.queueCallbackBeforeExpiry(() => {
  //       AuthApiService.refreshToken()
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   IdleService.unRegisterIdleResets()
  //   TokenService.clearCallbackBeforeExpiry()
  // }

  // logoutFromIdle = () => {
  //   TokenService.clearAuthToken()
  //   TokenService.clearCallbackBeforeExpiry()
  //   IdleService.unRegisterIdleResets()
  //   this.forceUpdate()
  // }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <div className='App'>
        <Header />
        <main className='App__main'>
          {hasError && (
            <p className='red'>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={ListListRoute}
            />
            <PrivateRoute
              path={'/list/:listId'}
              component={LearningRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App
