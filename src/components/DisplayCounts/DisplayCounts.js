import React, { Component } from 'react'
import LearningContext from '../../contexts/LearningContext'
import './DisplayCounts.css'

class DisplayCounts extends Component {
  static contextType = LearningContext

  render() {
    const { wordCorrectCount, wordIncorrectCount } = this.context
    return (
      <div className='DisplayCounts'>
        <p className='correct'>
          You have answered this word correctly{' '}
          <span>{wordCorrectCount}</span>{' '}
          times.
        </p>
        <p className='incorrect'>
          You have answered this word incorrectly{' '}
          <span>{wordIncorrectCount}</span>{' '}
          times.
        </p>
      </div>
    )
  }
}

export default DisplayCounts
