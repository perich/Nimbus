import React from 'react';
import {
  TouchableHighlight,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  View,
} from 'react-native';
import Components from 'exponent';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import { API_URL } from '../environment.js';
import * as helpers from '../utilities/helpers.js';

const add = '../assets/images/add,png';

class AddFriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      searchResults: [],
      searchResultFirstName: '',
      searchResultLastName: '',
      searchResultPhoto: '',
    };

    this.searchFriends = this.searchFriends.bind(this);
    this.showAddFriendButton = this.showAddFriendButton.bind(this);

  }

  static route = {
    navigationBar: {
      title: 'Add Friend',
      tintColor: 'white',
      titleStyle: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 20,
      },
      backgroundColor: '#00284d',
      searchResults: '',
    },
  }

  showAddFriendButton() {
    this.setState({});
  }

  addFriend(friendId) {
    fetch(`${API_URL}/api/users/${friendId}/friendships`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authToken}`
      },
      body: JSON.stringify({id: this.props.userId})
    })
    .then((response) => {
      console.log('server response', response);
      console.log('status', response.status);
      if (response.status === 201) {
        window.alert('Friend added!'); 
        this.props.getFriends(this.props.userId);
      } else {
        window.alert('You already added this user!')
      }
    }).catch((error) => {
      console.log('***ERRROR***');
      console.warn(error);
    })
  }

  searchFriends() {
    // fetch all users from DB
    let fullName = this.state.text.split(' ');
    let firstName = fullName[0];
    let lastName = fullName[1];

    fetch(`${API_URL}/api/users?firstName=${firstName}&lastName=${lastName}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authToken}`
      }
    })
    .then((response) => response.json())
    .then((searchResults) => {
      this.setState({searchResults: searchResults, text: ''});
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  render() {

    return (
      <View style={styles.mainContainer}>
        <Text style={{textAlign: 'center', margin: 7}}>Type a friend's first name and last name</Text>
        <TextInput style={styles. textInput} onChangeText={(text) => this.setState({text: text})} value={this.state.text} />
        <Button title='Search...' onPress={this.searchFriends} />
        {this.state.searchResults.map(searchResult => (
          <View style={styles.card} key={searchResult.id}>
            <View style={[styles.cardBody, {flexDirection: 'row'}]}>
              <Image style={styles.friendPhoto} source={{uri: searchResult.photo}}/>
              <Text style={styles.signOutText}>{helpers.capitalizeFirstChar(searchResult.firstName)} {helpers.capitalizeFirstChar(searchResult.lastName)}</Text>
              <TouchableNativeFeedback onPress={this.addFriend.bind(this, searchResult.id)} style={styles.addButton}>
                <Image style={styles.addButton} source={{uri: 'https://cdn3.iconfinder.com/data/icons/musthave/256/Add.png'}}/>
              </TouchableNativeFeedback>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

function _mapStateToProps(state) {
  return {
    userId: state.userState.currentUser.userId,
    authToken: state.userState.currentUser.authToken
  };
}

function _mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(_mapStateToProps, _mapDispatchToProps)(AddFriendScreen)
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },  
  friendContainer: {
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    height: 100
  },
  friendPhoto: {
    flex:0.4,
  },
  friendName: {
    textAlign: 'center',
    flex:0.3
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:0.3,
    height: 25
  },
  textInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 7,
  },
  addButton: {
    height: 25,
    width: 25,
  },
  searchButton: {
    flex:1,
    backgroundColor: 'blue'
  },
  card: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  addFriendButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendPhoto: {
    height: 25,
    width: 25,
    borderRadius: 12,
  },
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});