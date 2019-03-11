import React, { Component } from 'react'
import ListApiService from '../../services/list-api-service'
import ListContext from '../../contexts/ListContext'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'

class LearnWordForm extends Component {
  static contextType = ListContext

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { guess } = ev.target
    ListApiService.postGuess({ guess: guess.value })
      .then(head => {
        this.context.setNextWord(head.nextWord)
        this.context.setScore(head.listScore)
        guess.value = ''
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LearnWordForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='LearnWordForm__guess-input'>
          <Label htmlFor='learn-guess-input'>
            What's the translation for this word?
          </Label>
          <Input
            id='learn-guess-input'
            name='guess'
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
