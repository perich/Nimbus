import React from 'react';
import { Components } from 'exponent';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class PinScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${params.user}'s Post`;
      }
    },
  }

  goToFriendsProfile() {
    this.props.navigator.push('friendProfile', this.props.route.params);
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>
        <View style={styles.mapContainer}>
          <Components.MapView style={{flex: 1}} initialRegion={{latitude: this.props.route.params.location.latitude, longitude: this.props.route.params.location.longitude, latitudeDelta: 0.0012, longitudeDelta: 0.0001,}}>
            <Components.MapView.Marker coordinate={this.props.route.params.location}/>
          </Components.MapView>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <TouchableHighlight underlayColor={'transparent'} onPress={this.goToFriendsProfile.bind(this)}>
              <Image style={styles.profilePicture} source={{uri: this.props.route.params.profilePic}}></Image>
            </TouchableHighlight>
          </View>
          <View style={styles.profileDetailsContainer}>
            <View style={styles.profileNameContainer}>
              <Text>{this.props.route.params.user}</Text>
            </View>
            <View style={styles.profileTimeContainer}>
              <Text>{this.props.route.params.createdAt}</Text>
            </View>
            </View>
        </View>
        <View style={styles.mediaContainer}>
          <Image style={styles.media} source={{uri: this.props.route.params.mediaURL}}></Image>
        </View>
        <View style={styles.likesContainer}>
          <Text>{this.props.route.params.likes} Likes</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{this.props.route.params.description}</Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 3,
  },
  profileContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileDetailsContainer: {
    flex: 3,
  },
  profileNameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  profileTimeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mediaContainer: {
    flex: 5,
  },
  media: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
  },
  likesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 2,
  },
});
