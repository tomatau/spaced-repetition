import React, { Component } from 'react'
import { Input, Required, Label } from '../Form/Form'
import Button from '../Button/Button'

class RegistrationForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault()
  }

  render() {
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div className='RegistrationForm__name-input'>
          <Label htmlFor='registration-name-input'>
            Enter your name <Required />
          </Label>
          <Input
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className='RegistrationForm__username-input'>
          <Label htmlFor='registration-username-input'>
            Choose a username <Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div className='RegistrationForm__password-input'>
          <Label htmlFor='registration-password-input'>
            Choose a password <Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button type='submit'>
          Sign up
        </Button>
      </form>
    )
  }
}

export default RegistrationForm
