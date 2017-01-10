import * as types from './ActionTypes.js';

export function setLocation(location, mapIsReady) {
  return {
    type: types.SET_LOCATION,
    location,
    mapIsReady,
  };
}

export function getPins(currentUser) {
  return {
    type: types.GET_PINS,
    currentUser,
  };
}