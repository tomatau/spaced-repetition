import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'

class LoginForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault()
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='LoginForm'>
        <div className='LoginForm__username-input'>
          <Label htmlFor='login-username-input'>
            Username
          </Label>
          <Input
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div className='LoginForm__password-input'>
          <Label htmlFor='login-password-input'>
            Password
          </Label>
          <Input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm
