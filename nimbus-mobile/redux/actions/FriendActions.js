import * as types from './ActionTypes.js';

export function getFriendPins(friend) {
  return (dispatch, getState) => {
    console.log('Fetching friends pins...');
    fetch('http://107.170.233.162:1337/api/users/' + friend.id + '/pins', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data is: ', data.records[0]._fields[0].properties.location);
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
          firstName: friend.firstName,
          lastName: friend.lastName,
          profileURL: friend.profileURL,
          email: friend.email,
          // Replaced with sessions
          pinColor:  '#4286f4',
        });
      }
      console.log('MARKERS****************************************************************************', markers);
      dispatch(setFriendMarkers({ markers }));
      // that.setState({
      //   markers: markers,
      //   viewIsReady: true,
      // });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  };
}

export function setFriendMarkers(markers) {
  return {
    type: types.SET_FRIEND_MARKERS,
    markers,
  };
}

export function toggleViewReady() {
  return {
    type: types.TOGGLE_VIEW_READY,
  };
}

  // getFriendPins() {
    // var that = this;
    // console.log('Fetching friends pins...');
    // fetch('http://107.170.233.162:1337/api/users/' + this.props.route.params.id + '/pins', {
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
    //     markers.push({
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
    //       firstName: that.props.route.params.firstName,
    //       lastName: that.props.route.params.lastName,
    //       profileURL: that.props.route.params.profileURL,
    //       email: that.props.route.params.email,
    //       // Replaced with sessions
    //       pinColor:  '#4286f4',
    //     });
    //   }
    //   that.setState({
    //     markers: markers,
    //     viewIsReady: true,
    //   });
    // })
    // .catch((error) => {
    //   console.warn(error);
    // }).done();
  // }