import React, { Component } from 'react'
import ListApiService from '../../services/list-api-service'
import ListContext from '../../contexts/ListContext'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'

class LearnWordForm extends Component {
  static defaultProps = {
    listId: null
  }

  static contextType = ListContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { listId } = this.props
    const { guess } = ev.target

    this.context.setGuess(guess.value)
    ListApiService.postGuess(listId, guess.value)
      .then(head => {
        this.context.setPrevWord(this.context.nextWord)
        this.context.setScore(head.listScore)
        this.context.setNextWord(head.nextWord)
        this.context.setIsCorrect(head.isCorrect)
        this.context.setAnswer(head.answer)
        guess.value = ''
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
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
            ref={this.firstInput}
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
