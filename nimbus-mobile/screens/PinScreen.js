import React from 'react';
import { Components } from 'exponent';
import {
  Button,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TimeAgo from 'react-native-timeago';
import noUserImg from '../assets/images/noUser.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import { API_URL } from '../environment.js';
const like = require('../assets/images/like.png');
import Swiper from 'react-native-swiper';
import { Ionicons } from '@exponent/vector-icons';
import { View } from 'react-native-animatable';
import * as helpers from '../utilities/helpers.js';

let { width, height } = Dimensions.get('window');

class PinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    }
  }

  static route = {
    navigationBar: {
      title(params) {
        return `Pin`;
      },
      // tintColor: 'white',
      titleStyle: {
        // color: 'white',
        fontFamily: 'Avenir',
        fontSize: 20,
      },
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
        console.log('category', this.props.route);
        data.forEach(id => {
          if (id === this.props.currentUserId) {
            this.setState({liked: true});
          } 
        })
    }).catch((error) => {
      console.log('***ERRROR***');
      console.warn(error);
    })
  }

  goToFriendsProfile() {
    let { userId, firstName, lastName, profileUrl, email } = this.props.route.params;
    let friend = {
      id: userId,
      firstName,
      lastName,
      profileUrl,
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

  getDirections() {
    console.log('get directions')
    var lat = this.props.route.params.location.latitude
    var long =this.props.route.params.location.longitude
    var uri = `http://maps.apple.com/?daddr=${lat},${long}`

    Linking.canOpenURL(uri).then(supported => {
      if (supported) {
        Linking.openURL(uri);
      } else {
        console.log('Don\'t know how to open URI: ' + uri);
      }
    });
  }

  render() {
    return (
      <Swiper
        style={styles.wrapper} 
        showPagination={true}
        paginationStyle={{ padding: 100 }}
        loop={false}
        activeDotColor={'#1B8FFF'}
        dotColor={'#9B9FA4'}
      >
        <View style={styles.slide1}>
          <View style={styles.profileContainer}>

            <View style={styles.profilePictureContainer}>
              <TouchableHighlight underlayColor={'transparent'} onPress={this.goToFriendsProfile.bind(this)}>
                <Image style={styles.profilePicture} source={{uri: this.props.route.params.profileUrl}}></Image>
              </TouchableHighlight>
            </View>

            <View style={styles.profileDetailsContainer}>
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileText}>{helpers.capitalizeFirstChar(this.props.route.params.firstName)} {helpers.capitalizeFirstChar(this.props.route.params.lastName)}</Text>
              </View>
              <View style={styles.profileTimeContainer}>
                <TimeAgo style={styles.timeAgoText} time={JSON.parse(this.props.route.params.createdAt)}/>
              </View>
            </View>

          </View>
          <Image style={styles.media}  resizeMode={'stretch'} source={{uri: this.props.route.params.mediaURL}}></Image>
          <View style={styles.footer}>

            <View style={styles.likesContainer}>
              <View style={styles.heartIoniconContainer}>
                <TouchableOpacity onPress={this.like.bind(this)}>
                  <Ionicons name={'md-heart'} size={26} color={'#e53935'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.footerText}>{this.props.route.params.likes} Likes</Text>
              <Text style={styles.categoryText}>Category: {this.props.route.params.category}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{this.props.route.params.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePictureContainer}>
              <TouchableHighlight underlayColor={'transparent'} onPress={this.goToFriendsProfile.bind(this)}>
                <Image style={styles.profilePicture} source={{uri: this.props.route.params.profileUrl}}></Image>
              </TouchableHighlight>
            </View>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileText}>{helpers.capitalizeFirstChar(this.props.route.params.firstName)} {helpers.capitalizeFirstChar(this.props.route.params.lastName)}</Text>
              </View>
              <View style={styles.profileTimeContainer}>
                <TimeAgo style={styles.timeAgoText} time={JSON.parse(this.props.route.params.createdAt)}/>
              </View>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Button title={'Get Directions'} onPress={this.getDirections.bind(this)}><Text>Get Directions</Text></Button>
            <Components.MapView style={{flex: 1}} scrollEnabled={false} initialRegion={{latitude: this.props.route.params.location.latitude, longitude: this.props.route.params.location.longitude, latitudeDelta: 0.0012, longitudeDelta: 0.0001,}}>
              <Components.MapView.Marker coordinate={this.props.route.params.location}/>
            </Components.MapView>
          </View>
          <View style={{height: 56, width, backgroundColor: 'green',}}>
          </View>
        </View>
      </Swiper>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: state.userState.currentUser.userId,
    authToken:state.userState.currentUser.authToken,
    currentUser: state.userState.currentUser,
    profileUrl: state.userState.currentUser.profileUrl,
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 0.5,
  },
  descriptionContainer: {
    flex: 4,
    alignItems: 'center',
    paddingLeft: 17,
    paddingTop: 10,
  },
  descriptionText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#1972FF',
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
  },
  footerText: {
    fontFamily: 'Avenir',
    fontSize: 16,
    paddingVertical: 12,
    flex: 3,
    flexDirection: 'row'
  },
  heartIoniconContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  likeButton: {
    height: 13,
    width: 13,
    marginRight: 3,
  },
  likesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  media: {
    flex: 6,
    width: width,
    height: width,
  },
  profileContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  profileDetailsContainer: {
    flex: 3,
  },
  profileNameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 2,
    paddingLeft: 5,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  profileText: {

    fontFamily: 'Avenir-Heavy',
    fontSize: 20,
    paddingTop: 3,
  },

  timeAgoText: {
    fontFamily: 'AvenirNext-Italic',
    fontSize: 14,
    paddingBottom: 3,
  },
  profileTimeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 3,
    paddingLeft: 5,
  },
  media: {
    flex: 5,
  },
  heartIoniconContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    flex: 1
  },
  likesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  likeButton: {
    height: 13,
    width: 13,
    marginRight: 3,
  },
  descriptionContainer: {
    flex: 4,
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  descriptionText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    flex: 3,
    flexDirection: 'row'
  },
  categoryText: {
    fontSize: 16,
    paddingTop: 12,
    paddingLeft: 100,
    fontFamily: 'Avenir',
    flex: 5,
    flexDirection: 'row',
  },
});
