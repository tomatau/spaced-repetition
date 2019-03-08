import React, { Component } from 'react'
import * as Layout from '../../components/Layout/Layout'
import LearnWordForm from '../../components/LearnWordForm/LearnWordForm'
import DisplayWord from '../../components/DisplayWord/DisplayWord'

class LearningRoute extends Component {
  render() {
    return (
      <>
        <Layout.FullWidth>
          <DisplayWord />
        </Layout.FullWidth>
        <Layout.Section>
          <LearnWordForm />
        </Layout.Section>
      </>
    );
  }
}

export default LearningRoute
