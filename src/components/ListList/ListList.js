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
              <h2 className='ListList__item-name'>
                {list.name}
              </h2>
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
        <h2 className='ListList__title'>
          Choose a language to practice!
        </h2>
        {lists.length
          ? this.renderLists()
          : this.renderNoLists()}
      </div>
    )
  }
}

export default ListList
