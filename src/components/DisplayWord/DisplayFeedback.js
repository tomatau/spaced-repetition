import React, { Component } from 'react'
import ListContext from '../../contexts/ListContext'
// import './DisplayWord.css'

class DisplayWord extends Component {
  static contextType = ListContext

  render() {
    const { isCorrect, prevWord, answer, guess } = this.context
    return (
      <div className='Feedback'>
        {isCorrect
          ? <p>You were correct!</p>
          : <p>Good try, but not quite right</p>}
        <p>
          The correct translation for{' '}
          <span className='word'>{prevWord}</span>{' '}
          was <span className='correct'>{answer}</span>{' '}
          and you chose <span className='guess'>{guess}</span>.
        </p>
        <button onClick={this.goToNextWord}>
          Try another word!
        </button>
      </div>
    )
  }
}

export default DisplayWord
