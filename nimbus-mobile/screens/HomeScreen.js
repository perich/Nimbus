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
      userLocation: {
        latitude: null,
        longitude: null,
      },
      mapIsReady: false,
      markers: [
        // {
        //   id: 0,
        //   location: {
        //     latitude: 37.78820,
        //     longitude: -122.4319,
        //   },
        //   mediaURL: 'https://s-media-cache-ak0.pinimg.com/originals/87/29/42/87294250588d80ca52a0dea8ffe3fee9.jpg',
        //   likes: 34,
        //   description: 'I had some really good food here!',
        //   user: 'Peter Parker',
        //   profilePic: 'http://rkuykendall.com/assets/where-to-start-reading-spiderman/thumb-usm1.jpg',
        //   email: 'spider.man@avengers.com',
        //   createdAt: '5 hours ago',
        //   pinColor:  '#4286f4',
        // },
        // {
        //   id: 1,
        //   location: {
        //     latitude: 37.8,
        //     longitude: -122.4,
        //   },
        //   mediaURL: 'http://sportsrants.com/wp-content/uploads/2016/09/la-sp-stephen-curry-20160206.jpg',
        //   likes: 497,
        //   description: 'Just saw Stephen Curry on the streets!! OMG',
        //   user: 'Carol Denver',
        //   profilePic: 'http://vignette2.wikia.nocookie.net/avengersalliance2/images/9/94/CaptainmarvelMN_5_fly-fight-win.png/revision/latest?cb=20160413181359',
        //   email: 'ms.marvel@avengers.com',
        //   createdAt: '36 minutes ago',
        //   pinColor:  '#17a821',
        // }
      ]
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  getPins() {
    var that = this;
    console.log('Fetching pins...');
    fetch('http://107.170.233.162:1337/api/users/10209954893502102/pins', {
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
          likes: 34,
          description: data.records[i]._fields[0].properties.description,
          user: 'Peter Parker',
          profilePic: 'http://rkuykendall.com/assets/where-to-start-reading-spiderman/thumb-usm1.jpg',
          email: 'spider.man@avengers.com',
          createdAt: data.records[i]._fields[0].properties.createdAt,
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
    borderRadius: 10,
    height: 50,
    width: 50,
    bottom: 25,
    right: 15,
    zIndex: 999,
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
    fontSize: 24,
  }
});
