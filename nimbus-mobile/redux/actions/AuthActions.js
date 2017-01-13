import * as types from './ActionTypes.js';

export function login() {
  return (dipatch, getState) => {
    // fetch()
  };
};

export function setUsername(username) {
  return {
    type: types.SET_USERNAME,
    username,
  };
};

export function setPassword(password) {
  return {
    type: types.SET_PASSWORD,
    password,
  };
};