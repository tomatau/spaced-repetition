import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Layout from '../Layout/Layout'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <Layout.Header className='Header'>
        <div>
          <h1 className='Header__title'>
            <Link to='/'>
              Spaced repetition
              {' '}
              <FontAwesomeIcon icon='space-shuttle' />
            </Link>
          </h1>
        </div>
        <nav>
          <Link to='/login'>Login</Link>
          {' | '}
          <Link to='/register'>Sign up</Link>
        </nav>
      </Layout.Header>
    );
  }
}

export default Header
