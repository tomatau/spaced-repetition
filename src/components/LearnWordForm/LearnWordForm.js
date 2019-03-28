import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import LearningContext from '../../contexts/LearningContext'
import { Input, Label } from '../Form/Form'
import Button from '../Button/Button'

class LearnWordForm extends Component {
  static contextType = LearningContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { guess } = ev.target

    this.context.setGuess(guess.value)

    LanguageApiService.postGuess(guess.value)
      .then(head => {
        this.context.setPrevWord(this.context.nextWord)
        this.context.setTotalScore(head.totalScore)
        this.context.setWordCorrectCount(head.wordCorrectCount)
        this.context.setWordIncorrectCount(head.wordIncorrectCount)
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
          Submit your answer
        </Button>
      </form>
    )
  }
}

export default LearnWordForm
