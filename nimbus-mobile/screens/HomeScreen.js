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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 10209954893502102,
      firstName: null,
      lastName: null,
      profilePic: null,
      email: null,
      userLocation: {
        latitude: null,
        longitude: null,
      },
      mapIsReady: false,
      markers: []
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  getPins() {
    console.log(this.props.currentUser);
    var that = this;
    console.log('Fetching pins...');
    fetch('http://107.170.233.162:1337/api/users/' + this.state.userId + '/pins', {
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
          firstName: 'Peter',
          lastName: 'Parker',
          profileURL: 'http://rkuykendall.com/assets/where-to-start-reading-spiderman/thumb-usm1.jpg',
          email: 'spider.man@avengers.com',
          // Replaced with sessions
          pinColor:  '#4286f4',
        });
      }
      that.setState({
        markers: markers,
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  componentDidMount() {
    var that = this;
    that.getPins();
    navigator.geolocation.getCurrentPosition(function(location) {
      that.setState({
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        mapIsReady: true,
      });
    })
  }

  goToAddPin() {
    this.props.navigator.push('addPin');
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  render() {
    if (this.state.mapIsReady) {    
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.addButton} underlayColor={'transparent'} onPress={this.goToAddPin.bind(this)}>
            <Text style={styles.addText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.refreshButton} underlayColor={'transparent'} onPress={this.getPins.bind(this)}>
            <Text style={styles.addText}>R</Text>
          </TouchableHighlight>
          <Components.MapView style={{flex: 1}} showsUserLocation={true} initialRegion={{latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}}>
            {this.state.markers.map(marker => (
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
    borderRadius: 10,
    height: 50,
    width: 50,
    bottom: 25,
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
