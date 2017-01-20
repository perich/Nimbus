import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Components
} from 'exponent';
import TimeAgo from 'react-native-timeago';
import {
  ExponentLinksView,
} from '@exponent/samples';
import { MaterialIcons } from '@exponent/vector-icons';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';
import { API_URL } from '../environment.js';
import * as helpers from '../utilities/helpers.js';

const { width, height } = Dimensions.get('window');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMarkers: [],
    }
  }

  static route = {
    navigationBar: {
      title: 'Your Profile'
    },
  }

  componentWillMount() {
    var that = this;
    var mapToColor = {
      'Food': '#ffc700',
      'Exciting': '#ffff00',
      'Dangerous': '#ff0000',
      'Chill': '#0000ff',
      'Gross': '#0acc27',
      'Other': '#ff00ff',
    };
    const AUTH_TOKEN = this.props.authToken;
    fetch(`${API_URL}/api/users/` + this.props.userId + '/pins', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data: ', data);
      var markers = [];
      for (var i = 0; i < data.length; i++) {
        markers.push({
          id: i,
          pinID: data[i]._fields[0].properties.id,
          location: {
            latitude: JSON.parse(data[i]._fields[0].properties.location).latitude,
            longitude: JSON.parse(data[i]._fields[0].properties.location).longitude,
          },
          mediaURL: data[i]._fields[0].properties.mediaUrl,
          likes: data[i]._fields[0].properties.likes,
          description: data[i]._fields[0].properties.description,
          createdAt: data[i]._fields[0].properties.createdAt,
          firstName: helpers.capitalizeFirstChar(that.props.firstName),
          lastName: helpers.capitalizeFirstChar(that.props.lastName),
          profileUrl: that.props.profileUrl,
          email: that.props.email || 'Facebook User',
          userId: that.props.id,
          pinColor: mapToColor[data[i]._fields[0].properties.category],
          category: data[i]._fields[0].properties.category,
        });
      }
      that.setState({
        userMarkers: markers,
      })
      console.log('User Markers: ', that.state.userMarkers);
    })
    .catch((error) => {
      console.log("*** ERROR ***");
      console.log(error);
      throw error;
    });
  }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  goToSettings() {
    this.props.navigator.push('settings');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.pictureContainer} source={{uri: this.props.profileUrl}}>
          <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
            <TouchableOpacity style={styles.settingsButtonContainer} onPress={this.goToSettings.bind(this)}>
              <Image style={styles.settingsButton} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Gear_1.svg/2000px-Gear_1.svg.png'}}/>
            </TouchableOpacity>
            <View style={styles.pictureDetails}>
              <Image style={styles.picture} source={{uri: this.props.profileUrl}}/>
              <Text style={styles.name}>{this.props.firstName} {this.props.lastName}</Text>
            </View>
          </Components.BlurView>
        </Image>
        {this.state.userMarkers.map(marker => (
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
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.userState.currentUser,
    userId: state.userState.currentUser.userId,
    firstName: state.userState.currentUser.firstName,
    lastName: state.userState.currentUser.lastName,
    email: state.userState.email,
    profileUrl: state.userState.currentUser.profileUrl,
    authToken: state.userState.currentUser.authToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    marginTop: 10,
    marginRight: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#00284d',
  },
  settingsButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    height: 35,
    width: 35,
    zIndex: 999,
  },
  settingsButton: {
    height: 25,
    width: 25,
    zIndex: 999,
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