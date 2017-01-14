import * as types from './ActionTypes.js';
import { Facebook } from 'exponent';
import { Platform } from 'react-native';

export function getFriends() {
  return (dispatch, getState) => {
    fetch('http://107.170.233.162:1337/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
          profileURL: data[i].photo,
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
    fetch('http://107.170.233.162:1337/api/users/' + currentUser.userId + '/pins', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var markers = [];
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
              // Replaced with sessions
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              profileURL: currentUser.profileUrl,
              email: currentUser.email || 'Facebook User',
              userId: currentUser.userId,
              // Replaced with sessions
              pinColor: mapToColor[data.records[i]._fields[0].properties.category],
            });
          }
        dispatch(handlePins({ markers }))
      })
      .catch((error) => {
        console.log("*** ERROR ***");
        console.log(error);
        throw error;
      });
  };
}

export function handleFacebookSignin({ currentUser }) {
  return {
    type: types.HANDLE_FACEBOOK_SIGNIN,
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
      // Steven's FB Key, put in environment variable
      '1348413101897052', {
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

                dispatch(handleFacebookSignin({currentUser: loginUser}));

                fetch('http://107.170.233.162:1337/api/users/', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "fbID": info.id,
                    "photoUrl": userPhoto.url
                  })
                })
                .then(function (result) {
                  if (result.status === 201) {
                    // do something with the data
                    // return result.json();
                  }
                })
                .catch(function (err) {
                  console.log("*** ERROR ***");
                  console.log(err);
                });   
            });
          })
          .catch((error) => {
            console.log("*** ERROR ***");
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