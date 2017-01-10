import React from 'react';
import Exponent from 'exponent';
import { Components } from 'exponent';
import {
  Image,
  Linking,
  Platform,
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
    var that = this;
    this.props.getPins(this.props.currentUser);
    console.log('*********************');
    navigator.geolocation.getCurrentPosition(function(location) {
      that.props.setLocation(location, true);      
      // that.setState({
      //   userLocation: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      //   mapIsReady: true,
      // });
    })
  }

  goToAddPin() {
    this.props.navigator.push('addPin');
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  render() {
    if (this.props.mapIsReady) {    
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.addButton} underlayColor={'transparent'} onPress={this.goToAddPin.bind(this)}>
            <Text style={styles.addText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.refreshButton} underlayColor={'transparent'} onPress={this.props.getPins}>
            <Text style={styles.addText}>R</Text>
          </TouchableHighlight>
          <Components.MapView style={{flex: 1}} showsUserLocation={true} initialRegion={{latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}}>
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

    // userId: state.userState.currentUser.userId , 
    // firstName: state.userState.currentUser.firstName,
    // lastName: state.userState.currentUser.lastName,
    // profilePic: state.userState.currentUser.profileUrl,
    email: state.homeState.email,
    userLocation: state.homeState.userLocation,
    mapIsReady: state.homeState.mapIsReady,
    markers: state.homeState.markers,

    // userId: props.currentUser.userId,
    // firstName: props.currentUser.firstName,
    // lastName: props.currentUser.lastName,
    // profilePic: props.currentUser.profileUrl,
    // email: 'Facebook User',
    // userLocation: {
    //   latitude: null,
    //   longitude: null,
    // },
    // mapIsReady: false,
    // markers: []
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
  refreshButton: {
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
    right: 70,
    zIndex: 999,
  },
  addText: {
    textAlign: 'center',
    color: 'grey',
    backgroundColor: 'transparent',
    fontSize: 30
  }
});
