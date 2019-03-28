import React, { Component } from 'react'
import LearningContext from '../../contexts/LearningContext'
import './DisplayWord.css'

class DisplayWord extends Component {
  static contextType = LearningContext

  render() {
    const { nextWord } = this.context
    return (
      <div className='DisplayWord'>
        <h2>
          Translate the word:
        </h2>
        <span className='DisplayWord__word'>
          {nextWord}
        </span>
      </div>
    )
  }
}

export default DisplayWord
