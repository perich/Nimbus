import React from 'react';
import Exponent from 'exponent';
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Components
} from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TimeAgo from 'react-native-timeago';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';

class FriendProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${params.firstName} ${params.lastName}'s Profile`;
      }
    },
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  render() {
    if (this.props.viewIsReady) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.pictureContainer} source={{uri: this.props.profileURL}}>
              <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
                <View style={styles.pictureDetails}>
                  <Image style={styles.picture} source={{uri: this.props.profileURL}}/>
                </View>
              </Components.BlurView>
            </Image>
            <Text style={styles.name}>{this.props.firstName} {this.props.lastName}</Text>
            <Text style={styles.email}>{this.props.email}</Text>
            {this.props.markers.map(marker => (
              <View style={styles.markerContainer} key={marker.id}>
                <TimeAgo time={JSON.parse(marker.createdAt)}/>
                <View style={styles.mapContainer}>
                  <Components.MapView style={styles.mapCard} initialRegion={{latitude: marker.location.latitude, longitude: marker.location.longitude, latitudeDelta: 0.0012, longitudeDelta: 0.0001,}} cacheEnabled={true} loadingEnabled={true} onPress={this.displayPin.bind(this, marker)}>
                    <Components.MapView.Marker coordinate={marker.location}/>
                  </Components.MapView>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    id: state.friendState.id,
    profileURL: state.friendState.profileURL,
    firstName: state.friendState.firstName,
    lastName: state.friendState.lastName,
    email: state.friendState.email,
    markers: state.friendState.markers,
    viewIsReady: state.friendState.viewIsReady,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  mapContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    height: 200,
    margin: 5,
  },
  mapCard: {
    flex: 1,
    borderRadius: 10,
  },
  pictureContainer: {
    height: 200,
  },
  blur: {
    height: 200,
  },
  pictureDetails: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    height: 135,
    width: 135,
    borderRadius: 67,
  },
  name: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  email: {
    textAlign: 'center',
    padding: 3,
  },
  recent: {
    margin: 5,
  }
});