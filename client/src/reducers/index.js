import { combineReducers } from 'redux'

// importing the reducer
import archives from './archives'
import users from './users'

export default combineReducers({
  // all the reducers we have
  archives,
  users
});