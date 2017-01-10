import { combineReducers } from 'redux';
import * as UserReducer from './UserReducer.js';
import * as HomeReducer from './HomeReducer.js';

export default combineReducers(Object.assign({},
  UserReducer,
  HomeReducer,
));