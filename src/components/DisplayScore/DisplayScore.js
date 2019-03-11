import React, { Component } from 'react'
import ListContext from '../../contexts/ListContext'
import './DisplayScore.css'

class DisplayScore extends Component {
  static contextType = ListContext

  render() {
    const { score } = this.context
    return (
      <div className='DisplayScore'>
        <p>
          Your current score is:{' '}
          <span className='DisplayWord__score'>
            {score}
          </span>
        </p>
      </div>
    )
  }
}

export default DisplayScore
