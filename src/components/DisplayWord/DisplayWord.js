import React, { Component } from 'react'
import './DisplayWord.css'

class DisplayWord extends Component {
  render() {
    const word = `'epIl naHmey`
    return (
      <div className='DisplayWord'>
        <h2>
          Translate the word:
        </h2>
        <span className='DisplayWord__word'>
          {word}
        </span>
      </div>
    )
  }
}

export default DisplayWord
