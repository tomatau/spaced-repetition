import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import TokenService from '../../services/token-service'
import LanguageContext from '../../contexts/LanguageContext'
import * as Layout from '../../components/Layout/Layout'
import Language from '../../components/Language/Language'

class DashboardRoute extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    LanguageApiService.getLanguage()
      .then(response => {
        this.context.setLanguage(response.language)
        this.context.setWords(response.words)
      })
      .catch(error => {
        if (error.error === 'Unauthorized request') {
          TokenService.clearAuthToken()
          this.props.history.push('/login')
        }
        this.context.setError(error)
      })
  }

  render() {
    const { language, words } = this.context
    return (
      <Layout.Section wider>
        <Language
          language={language}
          words={words}
        />
      </Layout.Section>
    );
  }
}

export default DashboardRoute
