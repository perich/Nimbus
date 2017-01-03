import React from 'react';
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
import { Router } from '../navigation/Router';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [
        {
          key: 0,
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
          title: 'Marker1',
          description: 'This is a marker',
          pinColor:  '#4286f4',
        },
        {
          key: 1,
          latlng: {
            latitude: 37.8,
            longitude: -122.4,
          },
          title: 'Marker2',
          description: 'This is a marker',
          pinColor:  '#17a821',
        }
      ]
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  goToAddPin() {
    this.props.navigator.push('addPin');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.addButton} underlayColor={'transparent'} onPress={this.goToAddPin.bind(this)}>
          <Text style={styles.addText}>+</Text>
        </TouchableHighlight>
        <Components.MapView style={{flex: 1}} initialRegion={{latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}}>
          {this.state.markers.map(marker => (
              <Components.MapView.Marker
                key={marker.key}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                pinColor={marker.pinColor}
              />
            ))}
        </Components.MapView>
      </View>
    );
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
    top: 25,
    right: 15,
    zIndex: 999,
  },
  addText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 24,
  }
});
