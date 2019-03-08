import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <main className='App__main'>
          <Switch>
            <Route
              exact
              path={'/'}
              component={LearningRoute}
            />
            <Route
              path={'/register'}
              component={RegistrationRoute}
            />
            <Route
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
