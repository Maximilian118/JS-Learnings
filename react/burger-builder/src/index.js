import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import './scss/index.module.css'

import * as serviceWorker from './serviceWorker'
import App from './containers/App'
import burgerReducer from './store/reducers/burgerReducer'
import detailsReducer from './store/reducers/detailsReducer'
import authReducer from './store/reducers/authReducer'

const rootReducer = combineReducers({
  burgerReducer: burgerReducer,
  detailsReducer: detailsReducer,
  authReducer: authReducer
})

// Middleware
let logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching...', action)
      const result = next(action)
      console.log('[Middleware] Next state...', store.getState())
      return result
    }
  }
}

const dev = process.env.NODE_ENV === 'development'
const composeEnhancers = dev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const store = dev ? createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))
: createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

axios.defaults.baseURL = 'https://burger-builder-703cc.firebaseio.com/'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'))
serviceWorker.unregister()