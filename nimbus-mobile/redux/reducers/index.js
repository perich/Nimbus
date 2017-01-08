import { combineReducers } from 'redux';
import * as UserReducer from './UserReducer.js';

export default combineReducers(Object.assign({},
  UserReducer,
));