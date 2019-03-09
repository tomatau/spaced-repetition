import React, { Component } from 'react'
import { Section } from '../../components/Layout/Layout'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  render() {
    return (
      <Section className='RegistrationRoute'>
        <p className='Header__description'>
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm />
      </Section>
    );
  }
}

export default RegistrationRoute
