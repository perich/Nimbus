import React from 'react';
import Exponent from 'exponent';
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
import * as helpers from '../utilities/helpers.js';

class FriendProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${helpers.capitalizeFirstChar(params.firstName)} ${helpers.capitalizeFirstChar(params.lastName)}'s Profile`;
      },
      titleStyle: {
        // color: 'white',
        fontFamily: 'Avenir',
        fontSize: 20,
      },
    },
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  render() {
    if (this.props.viewIsReady) {
      return (
        <ScrollView style={styles.container}>
          <Image style={styles.pictureContainer} source={{uri: this.props.profileUrl}}>
            <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
              <View style={styles.pictureDetails}>
                <Image style={styles.picture} source={{uri: this.props.profileUrl}}/>
                <Text style={styles.name}>{helpers.capitalizeFirstChar(this.props.firstName)} {helpers.capitalizeFirstChar(this.props.lastName)}</Text>
              </View>
            </Components.BlurView>
          </Image>
          {this.props.markers.map(marker => (
            <TouchableOpacity key={marker.id} style={styles.markerContainer} onPress={this.displayPin.bind(this, marker)}>
              <Image source={{uri: marker.mediaURL}} style={styles.markerImage}></Image>
              <View style={styles.markerDetails}>
                <View style={styles.timeAgoContainer}>
                  <TimeAgo time={JSON.parse(marker.createdAt)}/>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>{marker.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    profileUrl: state.friendState.profileUrl,
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
    backgroundColor: '#00284d',
  },
  markerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 5, 
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
    height: 170,
    marginBottom: 5,
  },
  blur: {
    height: 170,
  },
  pictureDetails: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  name: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontSize: 24,
  },
  email: {
    textAlign: 'center',
    padding: 3,
  },
  recent: {
    margin: 5,
  },
  markerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 80,
    marginBottom: 5,
  },
  markerImage: {
    flex: 1,
  },
  markerDetails: {
    flex: 2,
  },
  timeAgoContainer: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'flex-end',
  },
  descriptionContainer: {
    flex: 3,
  },
  descriptionText: {
    paddingLeft: 5,
    fontFamily: 'AvenirNext-Italic',
  }
});