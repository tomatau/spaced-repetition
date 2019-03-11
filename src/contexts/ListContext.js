import React, { Component } from 'react'

const ListContext = React.createContext({
  nextWord: null,
  score: 0,
  error: null,
  setError: () => { },
  clearError: () => { },
  setNextWord: () => { },
  setScore: () => { },
})

export default ListContext

export class ListProvider extends Component {
  state = {
    nextWord: null,
    score: 0,
    error: null,
  };

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }

  setScore = score => {
    this.setState({ score })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      nextWord: this.state.nextWord,
      score: this.state.score,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNextWord: this.setNextWord,
      setScore: this.setScore,
    }
    return (
      <ListContext.Provider value={value}>
        {this.props.children}
      </ListContext.Provider>
    )
  }
}
