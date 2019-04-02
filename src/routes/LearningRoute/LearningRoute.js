import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import TokenService from '../../services/token-service'
import LearningContext from '../../contexts/LearningContext'
import * as Layout from '../../components/Layout/Layout'
import LearnWordForm from '../../components/LearnWordForm/LearnWordForm'
import DisplayWord from '../../components/DisplayWord/DisplayWord'
import DisplayFeedback from '../../components/DisplayFeedback/DisplayFeedback'
import DisplayScore from '../../components/DisplayScore/DisplayScore'
import DisplayCounts from '../../components/DisplayCounts/DisplayCounts'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = LearningContext

  componentDidMount() {
    this.context.reset()

    LanguageApiService.getHead()
      .then(head => {
        this.context.setTotalScore(head.totalScore)
        this.context.setWordCorrectCount(head.wordCorrectCount)
        this.context.setWordIncorrectCount(head.wordIncorrectCount)
        this.context.setNextWord(head.nextWord)
      })
      .catch(error => {
        if (error.error === 'Unauthorized request') {
          TokenService.clearAuthToken()
          this.props.history.push('/login')
        }
        this.context.setError(error)
      })
  }

  renderForm() {
    return <>
      <Layout.FullWidth>
        <DisplayWord />
      </Layout.FullWidth>
      <Layout.Section className='LearningRoute__form'>
        <LearnWordForm />
      </Layout.Section>
    </>
  }

  renderFeedback() {
    return (
      <Layout.Section>
        <DisplayFeedback />
      </Layout.Section>
    )
  }

  render() {
    const showForm = this.context.isCorrect == null
    return (
      <div className='LearningRoute'>
        <Layout.FullWidth darker>
          <DisplayScore />
        </Layout.FullWidth>
        {showForm && this.renderForm()}
        {!showForm && this.renderFeedback()}
        {showForm && <footer><DisplayCounts /></footer>}
      </div>
    );
  }
}

export default LearningRoute
