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
  [types.HANDLE_FACEBOOK_SIGNIN]: (state, action) => {
    return Object.assign({}, state, {
      currentUser: action.currentUser,
    });
  },

  [types.HANDLE_PINS] (state, action) {
    return Object.assign({}, state, {
        markers: action.markers,
    });
  },

  [types.LOGOUT_USER] (state, action) {
    return Object.assign({}, state, {
      currentUser: 'noUser',
    });
  },

  [types.SET_FRIENDS] (state, action) {
    console.log('PREV FRIENDS*******************', state.friends);
    console.log('NEXT FRIENDS*******************', action.friends);
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

});