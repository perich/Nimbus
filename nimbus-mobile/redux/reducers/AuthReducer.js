import * as types from '../actions/ActionTypes.js';
import createReducer from '../lib/createReducer.js';

let initialAuthState = {
  isLoggedIn: false, // Is the user authenticated?
  isLoading: false, // Is the user loggingIn/signinUp?
  isAppReady: false, // Has the app completed the login animation?
  email: '',
  password: '',
};

export const authState = createReducer(initialAuthState, {
  [types.LOGOUT_USER] (state, action) {
    return Object.assign({}, state, {
      email: '',
      password: '',
      isLoggedIn: false,
      isAppReady: false,
    });
  },

  [types.SET_CURRENT_USER] (state, action) {
    console.log('IS APP READY???', state.isAppReady)
    return Object.assign({}, state, {
      isLoggedIn: true,
      isLoading: false,
      isAppReady: true,
    });
  },

  [types.ON_LOGIN_ANIMATION_COMPLETED] (state, action) {
    return Object.assign({}, state, {
      isAppReady: true,
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