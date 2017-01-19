import createReducer from '../lib/createReducer.js';
import * as types from '../actions/ActionTypes.js';

let initialFriendState = {
  id: null,
  profileUrl: null,
  firstName: null,
  lastName: null,
  email: 'Facebook User',
  markers: [],
  viewIsReady: false,
};

export const friendState = createReducer(initialFriendState, {
  [types.LOGOUT_USER] (state, action) {
    return Object.assign({}, state, {
      id: null,
      profileUrl: null,
      firstName: null,
      lastName: null,
      email: 'Facebook User',
      markers: [],
      viewIsReady: false,
    });
  },

  [types.SET_FRIEND_MARKERS] (state, action) {
    return Object.assign({}, state, {
      id: action.friend.id,
      profileUrl: action.friend.profileUrl,
      firstName: action.friend.firstName,
      lastName: action.friend.lastName,
      email: action.friend.email || 'Facebook User',
      markers: action.markers,
      viewIsReady: true,
    });
  },
    
});