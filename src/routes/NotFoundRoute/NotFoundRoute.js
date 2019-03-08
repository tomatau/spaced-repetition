import React, { Component } from 'react'
import { Section } from '../../components/Layout/Layout'

class NotFoundRoute extends Component {
  render() {
    return (
      <Section className='NotFoundRoute'>
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
      </Section>
    );
  }
}

export default NotFoundRoute
