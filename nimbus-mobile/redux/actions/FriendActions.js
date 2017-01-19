import * as types from './ActionTypes.js';
import { API_URL } from '../../environment.js';

export function setFriend(friend) {
  return (dispatch, getState) => {
    let apiUrl = `${API_URL}/api/users/` + friend.id + '/pins';
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().userState.currentUser.authToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      var markers = [];
      if (data.records) {
        for (var i = 0; i < data.records.length; i++) {
          markers.push({
            id: i,
            location: {
              latitude: JSON.parse(data.records[i]._fields[0].properties.location).latitude,
              longitude: JSON.parse(data.records[i]._fields[0].properties.location).longitude,
            },
            mediaURL: data.records[i]._fields[0].properties.mediaUrl,
            likes: 69420,
            description: data.records[i]._fields[0].properties.description,
            createdAt: data.records[i]._fields[0].properties.createdAt,
            pinColor:  '#4286f4',
            // Replaced with sessions
            firstName: friend.firstName,
            lastName: friend.lastName,
            profileUrl: friend.profileUrl,
            email: friend.email,
            userId: friend.id,
            // Replaced with sessions
          });
        }
      }
      dispatch(setFriendMarkers(markers, friend));
    })
    .catch((error) => {
      console.log('FriendActions.js: @setFriend: ***ERROR***')
      console.warn(error);
    }).done();
  };
}

export function setFriendMarkers(markers, friend) {
  return {
    type: types.SET_FRIEND_MARKERS,
    friend,
    markers,
  };
}