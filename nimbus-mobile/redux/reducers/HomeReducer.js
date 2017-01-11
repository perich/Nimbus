import * as types from '../actions/ActionTypes.js';
import createReducer from '../lib/createReducer.js';

let initialHomeState = {
  email: 'Facebook User',
  userLocation: {
    latitude: null,
    longitude: null,
  },
  mapIsReady: false,
  markers: []
};

export const homeState = createReducer(initialHomeState, {
  [types.SET_LOCATION] (state, action) {
    return Object.assign({}, state, {
      userLocation: {
        latitude: action.location.coords.latitude,
        longitude: action.location.coords.longitude,
      },
      mapIsReady: action.mapIsReady,
    });
  },

  [types.HANDLE_PINS] (state, action) {
    return Object.assign({}, state, {
        markers: action.markers,
    });
  },

});