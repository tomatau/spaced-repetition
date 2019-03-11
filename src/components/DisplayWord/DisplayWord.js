import React, { Component } from 'react'
import ListContext from '../../contexts/ListContext'
import './DisplayWord.css'

class DisplayWord extends Component {
  static contextType = ListContext

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
