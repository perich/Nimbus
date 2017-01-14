import createReducer from '../lib/createReducer.js';
import * as types from '../actions/ActionTypes.js';

let initialUserState = {
  id: null,
  name: null,
  currentUser: {
    userId: 'noUser',
    firstName: 'noUser',
    lastName: 'noUser',
    email: 'noUser',
    token: '',
    authToken: 'noUser',
  },
  email: 'Facebook User',
  userLocation: {
    latitude: null,
    longitude: null,
  },
  mapIsReady: false,
  markers: [],
  friends: [],
};

export const userState = createReducer(initialUserState, {
  [types.SET_CURRENT_USER]: (state, action) => {
    let currentUser = Object.assign({}, state.currentUser, action.currentUser);
    return Object.assign({}, state, {
      currentUser: currentUser,
    });
  },

  [types.HANDLE_PINS] (state, action) {
    return Object.assign({}, state, {
      markers: action.markers,
    });
  },

  [types.SET_FRIENDS] (state, action) {
    return Object.assign({}, state, {
      friends: action.friends,
    });
  },

  [types.SET_LOCATION] (state, action) {
    return Object.assign({}, state, {
      userLocation: {
        latitude: action.location.coords.latitude,
        longitude: action.location.coords.longitude,
      },
      mapIsReady: action.mapIsReady,
    });
  },

  [types.SET_TOKEN] (state, action) {
    var newCurrentUser = Object.assign({}, state.currentUser, { token: action.token});

    return Object.assign({}, state, {
      currentUser: newCurrentUser,
    });
  },

});