import React, { Component } from 'react'
import ListApiService from '../../services/list-api-service'
import ListContext from '../../contexts/ListContext'
import * as Layout from '../../components/Layout/Layout'
import LearnWordForm from '../../components/LearnWordForm/LearnWordForm'
import DisplayWord from '../../components/DisplayWord/DisplayWord'
import DisplayScore from '../../components/DisplayScore/DisplayScore'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = ListContext

  componentDidMount() {
    ListApiService.getHead()
      .then(head => {
        this.context.setNextWord(head.nextWord)
        this.context.setScore(head.listScore)
      })
      .catch(this.context.setError)
  }

  render() {
    return (
      <>
        <Layout.FullWidth darker>
          <DisplayScore />
        </Layout.FullWidth>
        <Layout.FullWidth>
          <DisplayWord />
        </Layout.FullWidth>
        <Layout.Section className='LearningRoute__form'>
          <LearnWordForm />
        </Layout.Section>
      </>
    );
  }
}

export default LearningRoute
