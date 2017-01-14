import * as types from '../actions/ActionTypes.js';
import createReducer from '../lib/createReducer.js';

let initialAuthState = {
  email: '',
  password: '',
};

export const authState = createReducer(initialAuthState, {
  [types.LOGOUT_USER] (state, action) {
    return Object.assign({}, state, {
      email: '',
      password: '',
    });
  },

  [types.SET_EMAIL] (state, action) {
    return Object.assign({}, state, {
      email: action.email,
    });
  },

  [types.SET_PASSWORD] (state, action) {
    return Object.assign({}, state, {
      password: action.password,
    });
  },

});