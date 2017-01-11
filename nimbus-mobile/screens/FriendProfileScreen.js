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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     markers: [],
  //     viewIsReady: false,
  //   }
  // }

  static route = {
    navigationBar: {
      title(params) {
        return `${params.firstName} ${params.lastName}'s Profile`;
      }
    },
  }

  componentDidMount() {
    console.log(this.props.route.params);
    if (this.props.route.params.id > 1000) {
      console.log('GETTING FRIEND PINS');
      this.props.getFriendPins(this.props.route.params);
    } else {
      this.props.toggleViewReady();
      // this.setState({
      //   viewIsReady: true,
      // })
    }
  }

  // getFriendPins() {
  //   var that = this;
  //   console.log('Fetching friends pins...');
  //   fetch('http://107.170.233.162:1337/api/users/' + this.props.route.params.id + '/pins', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Data is: ', data.records[0]._fields[0].properties.location);
  //     var markers = [];
  //     for (var i = 0; i < data.records.length; i++) {
  //       markers.push({
  //         id: i,
  //         location: {
  //           latitude: JSON.parse(data.records[i]._fields[0].properties.location).latitude,
  //           longitude: JSON.parse(data.records[i]._fields[0].properties.location).longitude,
  //         },
  //         mediaURL: data.records[i]._fields[0].properties.mediaUrl,
  //         likes: 69420,
  //         description: data.records[i]._fields[0].properties.description,
  //         createdAt: data.records[i]._fields[0].properties.createdAt,
  //         // Replaced with sessions
  //         firstName: that.props.route.params.firstName,
  //         lastName: that.props.route.params.lastName,
  //         profileURL: that.props.route.params.profileURL,
  //         email: that.props.route.params.email,
  //         // Replaced with sessions
  //         pinColor:  '#4286f4',
  //       });
  //     }
  //     that.setState({
  //       markers: markers,
  //       viewIsReady: true,
  //     });
  //   })
  //   .catch((error) => {
  //     console.warn(error);
  //   }).done();
  // }

  displayPin(marker) {
    this.props.navigator.push('pinView', marker);
  }

  render() {
    if (this.props.viewIsReady) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.pictureContainer} source={{uri: this.props.route.params.profileURL}}>
              <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
                <View style={styles.pictureDetails}>
                  <Image style={styles.picture} source={{uri: this.props.route.params.profileURL}}/>
                </View>
              </Components.BlurView>
            </Image>
            <Text style={styles.name}>{this.props.route.params.firstName} {this.props.route.params.lastName}</Text>
            <Text style={styles.email}>{this.props.route.params.email}</Text>
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