import 'unfetch/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { ListProvider } from './contexts/ListContext'
import { ListListProvider } from './contexts/ListListContext'
import App from './components/App/App'
import './setup-icons'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ListListProvider>
        <ListProvider>
          <App />
        </ListProvider>
      </ListListProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
