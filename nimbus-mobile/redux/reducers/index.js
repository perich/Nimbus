import { combineReducers } from 'redux';
import * as UserReducer from './UserReducer.js';
import * as FriendReducer from './FriendReducer.js';

export default combineReducers(Object.assign({},
  UserReducer,
  FriendReducer,
));