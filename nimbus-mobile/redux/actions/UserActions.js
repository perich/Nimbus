import * as types from './ActionTypes.js';
import { Facebook } from 'exponent';
import { Platform } from 'react-native';

export function logoutUser() {
  return {
    type: types.LOGOUT_USER,
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
          });
        }
      });
  }
};

export function handleFacebookSignin({ currentUser }) {
  return {
    type: types.HANDLE_FACEBOOK_SIGNIN,
    currentUser,
  };
};