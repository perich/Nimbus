import * as types from './ActionTypes.js';
import { Facebook } from 'exponent';
import { Platform } from 'react-native';
import { API_URL } from '../../environment.js';
import { FB_KEY } from '../../environment.js';
import * as helpers from '../../utilities/helpers.js';

export function getFriends(userId) {
  return (dispatch, getState) => {
    fetch(`${API_URL}/api/users/${userId}/friendships/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getState().userState.currentUser.authToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      var friends = [];
      for (var i = 0; i < data.length; i++) {
        friends.push({
          id: data[i].id,
          firstName: data[i].firstName,
          lastName: data[i].lastName,
          profileUrl: data[i].photo,
          email: data[i].email === 'No email' ? 'Facebook User' : data[i].email,
        });
      }
      dispatch(setFriends({ friends }));
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  };
}

export function getPins(currentUser) {
  var mapToColor = {
    'Food': '#ffc700',
    'Exciting': '#ffff00',
    'Dangerous': '#ff0000',
    'Chill': '#0000ff',
    'Gross': '#0acc27',
    'Other': '#ff00ff',
  };

  return (dispatch, getState) => {
    const AUTH_TOKEN = getState().userState.currentUser.authToken;
    fetch(`${API_URL}/api/users/` + currentUser.userId + '/pins/private', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      var markers = [];
      for (var i = 0; i < data.length; i++) {
        markers.push({
          id: i,
          pinID: data[i]._fields[0].properties.id,
          location: {
            latitude: JSON.parse(data[i]._fields[0].properties.location).latitude,
            longitude: JSON.parse(data[i]._fields[0].properties.location).longitude,
          },
          mediaURL: data[i]._fields[0].properties.mediaUrl,
          likes: data[i]._fields[0].properties.likes,
          description: data[i]._fields[0].properties.description,
          createdAt: data[i]._fields[0].properties.createdAt,
          firstName: helpers.capitalizeFirstChar(data[i]._fields[1].properties.firstName),
          lastName: helpers.capitalizeFirstChar(data[i]._fields[1].properties.lastName),
          profileUrl: data[i]._fields[1].properties.photo,
          email: data[i]._fields[1].properties.email || 'Facebook User',
          userId: data[i]._fields[1].properties.id,
          pinColor: mapToColor[data[i]._fields[0].properties.category],
        });
      }

      dispatch(handlePins({ markers }));
    })
    .catch((error) => {
      console.log("*** ERROR ***");
      console.log(error);
      throw error;
    });
  };
}

// NEED TO MODULARIZE LATER
export function getPinsPublic(currentUser) {
  var mapToColor = {
    'Food': '#ffc700',
    'Exciting': '#ffff00',
    'Dangerous': '#ff0000',
    'Chill': '#0000ff',
    'Gross': '#0acc27',
    'Other': '#ff00ff',
  };
  return (dispatch, getState) => {
    const AUTH_TOKEN = getState().userState.currentUser.authToken;
    fetch(`${API_URL}/api/users/` + currentUser.userId + '/pins/public', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      }
    })
    .then((response) => response.json())
// <<<<<<< HEAD
      .then((data) => {
        var markers = [];          
        for (var i = 0; i < data.length; i++) {
          markers.push({
            id: i,
            pinID: data[i]._fields[0].properties.id,
            location: {
              latitude: JSON.parse(data[i]._fields[0].properties.location).latitude,
              longitude: JSON.parse(data[i]._fields[0].properties.location).longitude,
            },
            mediaURL: data[i]._fields[0].properties.mediaUrl,
            likes: data[i]._fields[0].properties.likes,
            description: data[i]._fields[0].properties.description,
            createdAt: data[i]._fields[0].properties.createdAt,
            firstName: helpers.capitalizeFirstChar(data[i]._fields[1].properties.firstName),
            lastName: helpers.capitalizeFirstChar(data[i]._fields[1].properties.lastName),
            profileUrl: data[i]._fields[1].properties.photo,
            email: data[i]._fields[1].properties.email || 'Facebook User',
            userId: data[i]._fields[1].properties.id,
            pinColor: mapToColor[data[i]._fields[0].properties.category],
          });
        }
        dispatch(handlePins({ markers }));
      }).catch((error) => {
        console.log('error');
        console.log(error);
      })
// =======
//     .then((data) => {
//       var markers = [];          
//       for (var i = 0; i < data.length; i++) {
//         markers.push({
//           id: i,
//           location: {
//             latitude: JSON.parse(data[i]._fields[0].properties.location).latitude,
//             longitude: JSON.parse(data[i]._fields[0].properties.location).longitude,
//           },
//           mediaURL: data[i]._fields[0].properties.mediaUrl,
//           likes: 69420,
//           description: data[i]._fields[0].properties.description,
//           createdAt: data[i]._fields[0].properties.createdAt,
//           // Replaced with sessions
//           firstName: currentUser.firstName,
//           lastName: currentUser.lastName,
//           profileUrl: currentUser.profileUrl,
//           email: currentUser.email || 'Facebook User',
//           userId: currentUser.userId,
//           // Replaced with sessions
//           pinColor: mapToColor[data[i]._fields[0].properties.category],
//         });
//       }
//       dispatch(handlePins({ markers }));
//     })
// >>>>>>> Change all profileURL to profileUrl camel-case
    .catch((error) => {
      console.log("UserActions.js: getPins(): *** ERROR ***");
      console.log(error);
      throw error;
    });
  };
}


export function setCurrentUser({ currentUser }) {
  return {
    type: types.SET_CURRENT_USER,
    currentUser,
  };
};

export function handlePins({ markers }) {
  return {
    type: types.HANDLE_PINS,
    markers,
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER,
  };
}

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    token,
  };
}

export function signInWithFacebook() {
  return (dispatch, getState) => {
    Facebook.logInWithReadPermissionsAsync(
      FB_KEY, {
      permissions: ['public_profile', 'user_photos'],
      behavior: Platform.OS === 'ios' ? 'web' : 'system',
    })
    .then((result) => {
      if (result.type === 'success') {

        fetch(`https://graph.facebook.com/me?access_token=${result.token}&fields=id,name`)
          .then((response) => {
            return response.json();
          })
          .then((info) => {
            fetch(`https://graph.facebook.com/${info.id}/picture?type=large`)
              .then((userPhoto) => {

                let fullName = info.name.split(' ');
                let firstName = fullName[0];
                let lastName = fullName[1];

                let loginUser = {
                  userId: info.id,
                  firstName: firstName,
                  lastName: lastName,
                  profileUrl: userPhoto.url,
                };

                fetch(`${API_URL}/api/users`, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "fbID": info.id,
                    "photoUrl": userPhoto.url
                  })
                })
                .then(result => result.json())
                .then(function (data) {
                  dispatch(setCurrentUser({ currentUser: data.user }));
                })
                .catch(function (err) {
                  console.log(`UserActions.js: signInWithFacebook(): POST ${API_URL}/api/users *** ERROR ***`);
                  console.log(err);
                });   
            });
          })
          .catch((error) => {
            console.log("UserActions.js: signInWithFacebook(): GET https://graph.facebook.com/${info.id}/picture?type=large *** ERROR ***");
            console.log(err);
            throw err;
          });
        }
      });
  }
};

export function setLocation(location, mapIsReady) {
  return {
    type: types.SET_LOCATION,
    location,
    mapIsReady,
  };
}

export function setFriends({ friends }) {
  return {
    type: types.SET_FRIENDS,
    friends,
  };
}