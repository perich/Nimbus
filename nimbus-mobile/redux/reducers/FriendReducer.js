import createReducer from '../lib/createReducer.js';
import * as types from '../actions/ActionTypes.js';

let initialFriendState = {
  markers: [],
  viewIsReady: false,
};

export const friendState = createReducer(initialFriendState, {
  [types.TOGGLE_VIEW_READY] (state, action) {

    return Object.assign({}, state, {
      viewIsReady: !state.viewIsReady,
    });
  },

  [types.SET_FRIEND_MARKERS] (state, action) {
    return Object.assign({}, state, {
      markers: action.markers,
    });
  },

});