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

  [types.GET_PINS] (state, action) {

    // // console.log(state.currentUser);
    // // var that = this;
    // console.log('Fetching pins...');
    // fetch('http://107.170.233.162:1337/api/users/' + action.currentUser.userId + '/pins', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log('Data is: ', data.records[0]._fields[0].properties.location);
    //   var markers = [];
    //   for (var i = 0; i < data.records.length; i++) {
    //     state.markers.push({
    //       id: i,
    //       location: {
    //         latitude: JSON.parse(data.records[i]._fields[0].properties.location).latitude,
    //         longitude: JSON.parse(data.records[i]._fields[0].properties.location).longitude,
    //       },
    //       mediaURL: data.records[i]._fields[0].properties.mediaUrl,
    //       likes: 69420,
    //       description: data.records[i]._fields[0].properties.description,
    //       createdAt: data.records[i]._fields[0].properties.createdAt,
    //       // Replaced with sessions
    //       firstName: action.currentUser.firstName,
    //       lastName: action.currentUser.lastName,
    //       profileURL: action.currentUser.profilePic,
    //       email: action.currentUser.email,
    //       // Replaced with sessions
    //       pinColor:  '#4286f4',
    //     });
    //   }

    //   return Object.assign({}, state, {
    //     markers,
    //   });

    //   // that.setState({
    //   //   markers: markers,
    //   // });
    // })
    // .catch((error) => {
    //   console.warn(error);
    // }).done();
    return state;
  },

});