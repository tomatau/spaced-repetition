import React, { Component } from 'react'
import ListApiService from '../../services/list-api-service'
import TokenService from '../../services/token-service'
import ListListContext from '../../contexts/ListListContext'
import * as Layout from '../../components/Layout/Layout'
import ListList from '../../components/ListList/ListList'

class ListListRoute extends Component {
  static contextType = ListListContext

  componentDidMount() {
    ListApiService.getLists()
      .then(lists => {
        this.context.setLists(lists)
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
    const { lists } = this.context
    return (
      <Layout.Section wider>
        <ListList
          lists={lists}
        />
      </Layout.Section>
    );
  }
}

export default ListListRoute
