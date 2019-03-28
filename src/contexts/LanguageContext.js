import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: {},
  words: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLists: () => {},
  setWords: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: [],
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setLanguage = language => {
    this.setState({ language })
  }

  setWords = words => {
    this.setState({ words })
  }

  render() {
    const value = {
      // values
      language: this.state.language,
      words: this.state.words,
      error: this.state.error,
      // methods
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
