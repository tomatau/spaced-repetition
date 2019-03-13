import React, { Component } from 'react'
import cx from 'classnames'
import ListContext from '../../contexts/ListContext'
import Button from '../Button/Button'
import './DisplayFeedback.css'

class DisplayFeedback extends Component {
  static contextType = ListContext

  goToNextWord = () => {
    this.context.setIsCorrect(null)
  }

  render() {
    const { isCorrect, prevWord, answer, guess } = this.context
    return (
      <div className={cx('DisplayFeedback', {
        DisplayFeedback__correct: isCorrect,
        DisplayFeedback__false: !isCorrect,
      })}>
        {isCorrect
          ? <p className='DisplayFeedback__win'>
              You were correct! :D
            </p>
          : <p className='DisplayFeedback__lose'>
              Good try, but not quite right :(
            </p>}
        <p>
          The correct translation for{' '}
          <span className='DisplayFeedback__word'>
            {prevWord}
          </span>{' '}
          was{' '}
          <span className='DisplayFeedback__answer'>
            {answer}
          </span>
          <br/>
          and you chose{' '}
          <span className='DisplayFeedback__guess'>
            {guess}
          </span>!
        </p>
        <Button
          className='DisplayFeedback__next-word-button'
          onClick={this.goToNextWord}>
          Try another word!
        </Button>
      </div>
    )
  }
}

export default DisplayFeedback
