require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Tos from './layouts/tos/Tos'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(hashHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/tos" component={App}>
          <IndexRoute component={Tos} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
