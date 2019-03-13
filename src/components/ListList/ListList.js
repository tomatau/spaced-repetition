import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './ListList.css'

class ListList extends Component {
  render() {
    const { lists } = this.props
    return (
      <ul className='ListList'>
        {lists.map(list =>
          <li key={list.id} className='ListList__item'>
            <Link to={`/list/${list.id}`}>
              <h2 className='ListList__item-name'>
                {list.name}
              </h2>
              {' '}
              <span className='ListList__item-score'>
                Current score: {list.score}
              </span>
            </Link>
          </li>
        )}
      </ul>
    );
  }
}

export default ListList
