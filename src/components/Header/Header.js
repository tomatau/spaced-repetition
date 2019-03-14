import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import * as Layout from '../Layout/Layout'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <span className='Header__user-name'>
          <FontAwesomeIcon icon='user-circle' />
          {' '}
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>Login</Link>
        {' | '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <Layout.Header className='Header'>
        <h1 className='Header__title'>
          <Link to='/'>
            Spaced repetition
            {' '}
            <FontAwesomeIcon icon='space-shuttle' />
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </Layout.Header>
    );
  }
}

export default Header
