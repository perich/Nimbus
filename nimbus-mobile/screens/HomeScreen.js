import React from 'react';
import Exponent from 'exponent';
import { 
  Components,
  Permissions,
  Notifications,
  Location
} from 'exponent';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import Router from '../navigation/Router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';

class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  componentDidMount() {
    var cb = function(obj) {
      var lat = obj.coords.latitude;
      var long = obj.coords.longitude;
      var time = obj.timestamp;
      console.log('latitude: ', lat, 'longitude: ', long)
      // console.log('TIME: ', time)
    }

    // wait at least 4 minutes in between updates 
    // and only invoke the callback if the user has moved more than 10 meters
    var options = {
      enableHighAccuracy: false,
      timeInterval: 240000,
      distanceInterval: 1000
    }

    // Location.watchPositionAsync(options, cb)

    var that = this;
    navigator.geolocation.getCurrentPosition(function(location) {
      that.props.setLocation(location, true);      
      that.props.getPins(that.props.currentUser);
    });

    var getPushToken = async function() {
      if (!that.props.currentUser.pushToken) {
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
        if (status !== 'granted') {
          that.props.setToken('rejected');
          return;
        }
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExponentPushTokenAsync();

        // POST the token to our backend so we can use it to send pushes from there

        fetch('http://107.170.233.162:1337/api/users/' + that.props.currentUser.userId, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${that.props.currentUser.authToken}`
          },
          body: JSON.stringify({
            token: token,
          }),
        }).then(function(response) {
          // that.props.setToken(token);
        });
      } 
    }();
  }

  goToAddPin() {
    this.props.navigator.push('addPin');
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  getPins() {
    this.props.getPins(this.props.currentUser);
  }

  getPinsPublic() {
    this.props.getPinsPublic(this.props.currentUser);
  }

  render() {
    if (this.props.mapIsReady) {    
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.addButton} underlayColor={'transparent'} onPress={this.goToAddPin.bind(this)}>
            <Text style={styles.addText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.friendsButton} underlayColor={'transparent'} onPress={this.getPins.bind(this)}>
            <Text style={styles.addText}>Friends</Text>
          </TouchableHighlight>
          <Components.MapView style={{flex: 1}} showsUserLocation={true} initialRegion={{latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}}>
          <TouchableHighlight style={styles.publicButton} underlayColor={'transparent'} onPress={this.getPinsPublic.bind(this)}>
            <Text style={styles.addText}>Public</Text>
          </TouchableHighlight>
            {this.props.markers.map(marker => (
                <Components.MapView.Marker
                  key={marker.id}
                  coordinate={marker.location}
                  pinColor={marker.pinColor}
                  onSelect={this.displayPin.bind(this, marker)}
                />
              ))}
          </Components.MapView>
        </View>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

function mapStateToProps(state) {
  return {
    currentUser: state.userState.currentUser,
    email: state.userState.email,
    userLocation: state.userState.userLocation,
    mapIsReady: state.userState.mapIsReady,
    markers: state.userState.markers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 50,
    height: 50,
    width: 50,
    bottom: 15,
    right: 15,
    zIndex: 999
  },
  publicButton: {
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'grey',
    height: 35,
    width: 5%,
    bottom: 15,
    left: 45%,
    zIndex: 999,
  },  
  friendsButton: {
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'grey',
    height: 35,
    width: 5%,
    bottom: 15,
    left: 40%,
    zIndex: 999,
  },
  addText: {
    textAlign: 'center',
    color: 'grey',
    backgroundColor: 'transparent',
    fontSize: 16,
    bottom: 2
  }
});