import React, { Component } from 'react'
import ListApiService from '../../services/list-api-service'
import TokenService from '../../services/token-service'
import ListContext from '../../contexts/ListContext'
import * as Layout from '../../components/Layout/Layout'
import LearnWordForm from '../../components/LearnWordForm/LearnWordForm'
import DisplayWord from '../../components/DisplayWord/DisplayWord'
import DisplayFeedback from '../../components/DisplayFeedback/DisplayFeedback'
import DisplayScore from '../../components/DisplayScore/DisplayScore'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = ListContext

  componentDidMount() {
    const { listId } = this.props.match.params

    this.context.reset()

    ListApiService.getHead(listId)
      .then(head => {
        this.context.setNextWord(head.nextWord)
        this.context.setScore(head.listScore)
      })
      .catch(error => {
        if (error.error === 'Unauthorized request') {
          TokenService.clearAuthToken()
          // TODO: flash message stating user was logged out?
          this.props.history.push('/login')
        }
        this.context.setError(error)
      })
  }

  renderForm() {
    const { listId } = this.props.match.params
    return <>
      <Layout.FullWidth>
        <DisplayWord />
      </Layout.FullWidth>
      <Layout.Section className='LearningRoute__form'>
        <LearnWordForm listId={listId} />
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
    const { isCorrect } = this.context
    return (
      <>
        <Layout.FullWidth darker>
          <DisplayScore />
        </Layout.FullWidth>
        {isCorrect == null
          ? this.renderForm()
          : this.renderFeedback()}
      </>
    );
  }
}

export default LearningRoute
