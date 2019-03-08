import React, { Component } from 'react'
import { Section } from '../../components/Layout/Layout'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  render() {
    return (
      <Section className='RegistrationRoute'>
        <p className='Header__description'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <RegistrationForm />
      </Section>
    );
  }
}

export default RegistrationRoute
