import { combineReducers } from 'redux';
import * as UserReducer from './UserReducer.js';
import * as FriendReducer from './FriendReducer.js';
import * as AuthReducer from './AuthReducer.js';

export default combineReducers(Object.assign({},
  UserReducer,
  FriendReducer,
  AuthReducer,
));