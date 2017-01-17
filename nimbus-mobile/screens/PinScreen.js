import React from 'react';
import { Components } from 'exponent';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TimeAgo from 'react-native-timeago';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import { API_URL } from '../environment.js';
const like = require('../assets/images/like.png');

class PinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  static route = {
    navigationBar: {
      title(params) {
        return `${params.firstName} ${params.lastName}'s Post`;
      }
    },
  }

  componentWillMount() {
    // check if current user likes current pin in DB
    fetch(`${API_URL}/api/users/${this.props.route.params.userId}/pins/${this.props.route.params.pinID}/likes`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authToken}`
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log('pin likes', data);
        data.forEach(id => {
          if (id === this.props.currentUserId) {
            this.setState({liked: true});
          } 
        })
    }).catch((error) => {
      console.log('***ERRROR***');
      console.warn(error);
    })
      // if yes, this.setState({liked: true});
      // else, this.setState({liked: false});
  }

  goToFriendsProfile() {
    let { userId, firstName, lastName, profileURL, email } = this.props.route.params;
    let friend = {
      id: userId,
      firstName,
      lastName,
      profileURL,
      email,
    };
    this.props.setFriend(friend);
    this.props.navigator.push('friendProfile', friend);
  }


  like() {
    if (this.state.liked) {
      this.props.route.params.likes--;
      this.setState({liked: !this.state.liked});
      
    } else {
      this.props.route.params.likes++
      this.setState({liked: !this.state.liked});
    }
    
    fetch(`${API_URL}/api/users/${this.props.route.params.userId}/pins/${this.props.route.params.pinID}/likes`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authToken}`
      },
      body: JSON.stringify({id: this.props.currentUserId})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('server response', data);
    }).catch((error) => {
      console.log('***ERRROR***');
      console.warn(error);
    })
  }

  render() {
    console.log('PROFILE URL', this.props.profileUrl);
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>

        <View style={styles.mapContainer}>
          <Components.MapView style={{flex: 1}} cacheEnabled={true} initialRegion={{latitude: this.props.route.params.location.latitude, longitude: this.props.route.params.location.longitude, latitudeDelta: 0.0012, longitudeDelta: 0.0001,}}>
            <Components.MapView.Marker coordinate={this.props.route.params.location}/>
          </Components.MapView>
        </View>

        <View style={styles.profileContainer}>

          <View style={styles.profilePictureContainer}>
            <TouchableHighlight underlayColor={'transparent'} onPress={this.goToFriendsProfile.bind(this)}>
              <Image style={styles.profilePicture} source={{ uri: this.props.profileUrl }}></Image>
            </TouchableHighlight>
          </View>

          <View style={styles.profileDetailsContainer}>

            <View style={styles.profileNameContainer}>
              <Text>{this.props.route.params.firstName} {this.props.route.params.lastName}</Text>
            </View>

            <View style={styles.profileTimeContainer}>
              <TimeAgo time={JSON.parse(this.props.route.params.createdAt)}/>
            </View>

          </View>

        </View>

        <View style={styles.mediaContainer}>
          <Image style={styles.media} source={{uri: this.props.route.params.mediaURL}}></Image>
        </View>

        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image style={styles.likeButton} source={like}></Image>
          </TouchableOpacity>
          <Text>{this.props.route.params.likes} likes</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text>{this.props.route.params.description}</Text>
        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: state.userState.currentUser.userId,
    authToken:state.userState.currentUser.authToken
    profileUrl: state.userState.currentUser.profileUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  likeButton: {
    height: 13,
    width: 13,
    marginRight: 3,
  },
  descriptionContainer: {
    flex: 2,
  },
});
