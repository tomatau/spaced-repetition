import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './Language.css'

class Language extends Component {
  static defaultProps = {
    language: {},
    words: [],
  }

  renderWordList() {
    const { words } = this.props
    return (
      <ul className='Language__word-list'>
        {words.map(word =>
          <li key={word.id} className='Language__word'>
            <h4 className='Language__word-translation'>
              {word.translation}
            </h4>
            <div className='Language__word-counts'>
              <p className='Language__word-correct-count'>
                <FontAwesomeIcon fixedWidth icon='check' title='correct answer count:' />
                <span className="sr-only">correct answer count: </span>
                <strong>{word.correct_count}</strong>
              </p>
              <p className='Language__word-incorrect-count'>
                <FontAwesomeIcon fixedWidth icon='times' title='incorrect answer count:' />
                <span className="sr-only">incorrect answer count: </span>
                <strong>{word.incorrect_count}</strong>
              </p>
            </div>
          </li>
        )}
      </ul>
    )
  }

  render() {
    const { language } = this.props
    return (
      <div className='Language'>
        <header className='Language__title'>
          <h2 className='Language__name'>
            {language.name}
            <span className='Language__total-score'>
              Total correct answers: {language.total_score}
            </span>
          </h2>
          <Link
            to='/learn'
            className='Language__practice-button Button'
          >
            Start practicing
          </Link>
        </header>
        <div className='Language__word-list'>
          <h3>Words to practice</h3>
          {this.renderWordList()}
        </div>
      </div>
    )
  }
}

export default Language
