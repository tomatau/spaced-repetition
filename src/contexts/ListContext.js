import React, { Component } from 'react'

const initialState = {
  score: 0,
  nextWord: null,
  guess: null,
  prevWord: null,
  isCorrect: null,
  answer: null,
  error: null,
}

const ListContext = React.createContext({
  ...initialState,
  setError: () => { },
  clearError: () => { },
  setNextWord: () => { },
  setScore: () => { },
  setGuess: () => { },
  setAnswer: () => { },
  setIsCorrect: () => { },
  reset: () => { },
})

export default ListContext

export class ListProvider extends Component {
  state = {
    ...initialState,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setScore = score => {
    this.setState({ score })
  }

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }

  setGuess = guess => {
    this.setState({ guess })
  }

  setPrevWord = prevWord => {
    this.setState({ prevWord })
  }

  setIsCorrect = isCorrect => {
    this.setState({ isCorrect })
  }

  setAnswer = answer => {
    this.setState({ answer })
  }

  reset = () => {
    this.setState({
      ...initialState,
    })
  }

  render() {
    const value = {
      // values
      score: this.state.score,
      nextWord: this.state.nextWord,
      guess: this.state.guess,
      prevWord: this.state.prevWord,
      isCorrect: this.state.isCorrect,
      answer: this.state.answer,
      error: this.state.error,
      // methods
      setError: this.setError,
      clearError: this.clearError,
      setScore: this.setScore,
      setNextWord: this.setNextWord,
      setGuess: this.setGuess,
      setPrevWord: this.setPrevWord,
      setIsCorrect: this.setIsCorrect,
      setAnswer: this.setAnswer,
      reset: this.reset,
    }
    return (
      <ListContext.Provider value={value}>
        {this.props.children}
      </ListContext.Provider>
    )
  }
}
