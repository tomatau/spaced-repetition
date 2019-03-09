import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'

class LearnWordForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault()
  }

  render() {
    return (
      <form
        className='LearnWordForm'
        onSubmit={this.handleSubmit}
      >
        <div className='LearnWordForm__word-input'>
          <Label htmlFor='learn-word-input'>
            What's the translation for this word?
          </Label>
          <Input
            id='learn-word-input'
            name='word'
            required
            placeholder='Apple'
          />
        </div>
        <Button type='submit'>
          Submit your translation
        </Button>
      </form>
    )
  }
}

export default LearnWordForm
