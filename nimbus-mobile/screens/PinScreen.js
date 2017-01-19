import React from 'react';
import { Components } from 'exponent';
import {
  Button,
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
import noUserImg from '../assets/images/noUser.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import { API_URL } from '../environment.js';
const like = require('../assets/images/like.png');
import Swiper from 'react-native-swiper';
import { Ionicons } from '@exponent/vector-icons';
import { View } from 'react-native-animatable';

let { width, height } = Dimensions.get('window');

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
      },
      tintColor: 'white',
      titleStyle: {
        color: 'white',
        fontFamily: 'Avenir',
      },
      backgroundColor: '#00284d'
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
    console.log('goToFriendsProfile', this.props.route.params)
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
    return null;
  }

  render() {
    // let profilePicture = this.props.profileURL ? { uri: this.props.profileUrl } : noUserImg;

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
                <Text style={styles.profileText}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Text>
              </View>
              <View style={styles.profileTimeContainer}>
                <TimeAgo style={styles.timeAgoText} time={JSON.parse(this.props.route.params.createdAt)}/>
              </View>
            </View>
          </View>
          <Image style={styles.media}  resizeMode={'stretch'} source={{uri: this.props.route.params.mediaURL}}></Image>
          <View style={styles.footer}>
            <View style={styles.likesContainer}>
              <View style={styles.heartIoniconContainer} animation="tada" delay={600} duration={800}>
                <TouchableOpacity onPress={this.like.bind(this)}>
                  <Ionicons name={'md-heart'} size={32} color={'#e53935'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.footerText}>{this.props.route.params.likes} likes</Text>
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
                <Text style={styles.profileText}>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Text>
              </View>
              <View style={styles.profileTimeContainer}>
                <TimeAgo style={styles.timeAgoText} time={JSON.parse(this.props.route.params.createdAt)}/>
              </View>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Components.MapView style={{flex: 1}} initialRegion={{latitude: this.props.route.params.location.latitude, longitude: this.props.route.params.location.longitude, latitudeDelta: 0.0012, longitudeDelta: 0.0001,}}>
              <Components.MapView.Marker coordinate={this.props.route.params.location}/>
            </Components.MapView>
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
    flex: 1,
  },
  footer: {
    flex: 4,
    backgroundColor: 'white',
  },
  footerText: {
    fontFamily: 'AvenirNext-Italic',
    // color: '#00284d',
    color: '#1972FF',
    paddingVertical: 17,
  },
  mapContainer: {
    height: height-220,
  },
  profileContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 2,
    paddingLeft: 5,
  },
  profileText: {
    fontFamily: 'Avenir',
    // color: '#00284d',
    color: '#1972FF',
    fontSize: 20,
  },
  timeAgoText: {
    fontFamily: 'AvenirNext-Italic',
    // color: '#00284d',
    color: '#1972FF',
    fontSize: 14,
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
    flex: 4,
    alignItems: 'flex-start',
    paddingLeft: 17,
  },
  descriptionText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    // color: '#00284d',
    color: '#1972FF',
  },
});
