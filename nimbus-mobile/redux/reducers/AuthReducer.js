import * as types from '../actions/ActionTypes.js';
import createReducer from '../lib/createReducer.js';

let initialAuthState = {
  username: '',
  password: '',
};

export const authState = createReducer(initialAuthState, {
  [types.SET_USERNAME] (state, action) {
    return Object.assign({}, state, {
      username: action.username,
    });
  },

  [types.SET_PASSWORD] (state, action) {
    return Object.assign({}, state, {
      password: action.password,
    });
  },

});