import * as types from './ActionTypes.js';

export function setLocation(location, mapIsReady) {
  return {
    type: types.SET_LOCATION,
    location,
    mapIsReady,
  };
}

export function handlePins({ markers }) {
  return {
    type: types.HANDLE_PINS,
    markers,
  };
}

export function getPins(currentUser) {
  return (dispatch, getState) => {
    fetch('http://107.170.233.162:1337/api/users/' + currentUser.userId + '/pins', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log('RESPONSE********', response);
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
            // firstName: that.props.firstName,
            // lastName: that.props.lastName,
            // profileURL: that.props.profilePic,
            // email: that.props.email,
            // Replaced with sessions
            pinColor:  '#4286f4',
          });
        }
        dispatch(handlePins({ markers }))
      })
      .catch((error) => {
        console.log("*** ERROR ***");
        console.log(err);
        throw err;
      });
  };
}