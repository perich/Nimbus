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
import noUserImg from '../assets/images/noUser.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import { API_URL } from '../environment.js';
const like = require('../assets/images/like.png');
import Swiper from 'react-native-swiper';

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
    let profilePicture = this.props.profileURL ? { uri: this.props.profileUrl } : noUserImg;

    return (

      <Swiper 
        style={styles.wrapper} 
        showPagination={true}
        paginationStyle={{ padding: 100}}
        loop={false}
      >


        <View style={styles.slide1}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePictureContainer}>
              <TouchableHighlight underlayColor={'transparent'} onPress={this.goToFriendsProfile.bind(this)}>
                <Image style={styles.profilePicture} source={profilePicture}></Image>
              </TouchableHighlight>
            </View>

            <View style={styles.profileDetailsContainer}>
              <View style={styles.profileNameContainer}>
                <Text>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Text>
              </View>

              <View style={styles.profileTimeContainer}>
                <TimeAgo time={JSON.parse(this.props.route.params.createdAt)}/>
              </View>
            </View>
          </View>





          <Image style={styles.media}  resizeMode={'stretch'} source={{uri: this.props.route.params.mediaURL}}></Image>


          <View style={styles.footer}>

            <View style={styles.likesContainer}>
              <Text>{this.props.route.params.likes} Likes</Text>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text>{this.props.route.params.description}</Text>
            </View>
          </View>


        </View>

        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image style={styles.likeButton} source={like}></Image>
          </TouchableOpacity>
          <Text>{this.props.route.params.likes} likes</Text>
        </View>








        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  footer: {
    flex: 4,
    backgroundColor: 'yellow',
  },
  mapContainer: {
    flex: 3,
  },
  profileContainer: {
    flex: 1.5,
    flexDirection: 'row',
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileDetailsContainer: {
    flex: 3,
    backgroundColor: 'red',
  },
  profileNameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  profileTimeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  // mediaContainer: {
  //   flex: 5,
  //   backgroundColor: 'blue',
  // },
  media: {
    flex: 5,
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
