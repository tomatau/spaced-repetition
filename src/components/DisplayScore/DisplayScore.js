import React, { Component } from 'react'
import LearningContext from '../../contexts/LearningContext'
import './DisplayScore.css'

class DisplayScore extends Component {
  static contextType = LearningContext

  render() {
    const { totalScore } = this.context
    return (
      <div className='DisplayScore'>
        <p>
          Your total score is:{' '}
          <span className='DisplayWord__score'>
            {totalScore}
          </span>
        </p>
      </div>
    )
  }
}

export default DisplayScore
