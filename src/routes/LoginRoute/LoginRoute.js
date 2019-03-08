import React, { Component } from 'react'
import { Section } from '../../components/Layout/Layout'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  render() {
    return (
      <Section className='LoginRoute'>
        <LoginForm />
      </Section>
    );
  }
}

export default LoginRoute
