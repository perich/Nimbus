import createReducer from '../lib/createReducer.js';
import * as types from '../actions/ActionTypes.js';

let initialUserState = {
  id: null,
  authToken: null,
  name: null,
  currentUser: {
    userId: 'noUser',
    firstName: 'noUser',
    lastName: 'noUser',
    email: 'noUser',
  },
};

export const userState = createReducer(initialUserState, {
  // [types.LOGIN_USER] (state, action) {
  //   return Object.assign({}, state, {

  //   });
  // },

  [types.LOGOUT_USER] (state, action) {
    return Object.assign({}, state, {
      currentUser: 'noUser',
    });
  },

  [types.HANDLE_FACEBOOK_SIGNIN]: (state, action) => {
    console.log('INITIALSTATE', state);
    return Object.assign({}, state, {
      currentUser: action.currentUser,
    });
  },

});