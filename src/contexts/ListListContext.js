import React, { Component } from 'react'

const ListListContext = React.createContext({
  lists: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setLists: () => {},
})

export default ListListContext

export class ListListProvider extends Component {
  state = {
    lists: [],
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setLists = lists => {
    this.setState({ lists })
  }

  render() {
    const value = {
      // values
      lists: this.state.lists,
      error: this.state.error,
      // methods
      setError: this.setError,
      clearError: this.clearError,
      setLists: this.setLists,
    }
    return (
      <ListListContext.Provider value={value}>
        {this.props.children}
      </ListListContext.Provider>
    )
  }
}
