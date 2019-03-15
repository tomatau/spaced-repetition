import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ListList.css'

class ListList extends Component {
  static defaultProps = {
    lists: []
  }

  renderLists() {
    const { lists } = this.props
    return (
      <ul className='ListList__list'>
        {lists.map(list =>
          <li key={list.id} className='ListList__item'>
            <Link to={`/list/${list.id}`}>
              <h3 className='ListList__item-name'>
                {list.name}
              </h3>
              <span className='ListList__item-score'>
                Current score: {list.score}
              </span>
            </Link>
          </li>
        )}
      </ul>
    );
  }

  renderNoLists() {
    return (
      <div className='ListList__no-list'>
        <p>You have no lists :( Contact an administrator to get some!</p>
      </div>
    )
  }

  render() {
    const { lists } = this.props
    return (
      <div className='ListList'>
        <header className='ListList__title'>
          <h2>
            Your languages
          </h2>
          <p>Choose a language to practice using spaced repetition from the options below.</p>
        </header>
        {lists.length
          ? this.renderLists()
          : this.renderNoLists()}
      </div>
    )
  }
}

export default ListList
