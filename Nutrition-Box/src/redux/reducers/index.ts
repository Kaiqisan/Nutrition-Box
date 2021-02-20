import { combineReducers } from 'redux'
import counter from './counter'
import app from './app'

export default combineReducers({
  counter, app
})
