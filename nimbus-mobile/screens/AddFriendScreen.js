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
      searchResults: ''
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
        'Content-Type': 'application/json'
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
        <Text>Type a friend's first name and last name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <Button title='Search...' onPress={this.searchFriends} />
        {
          this.state.searchResults.map(searchResult => (
            <View key={searchResult.id} style={styles.subContainer}>
              <Image style={styles.photo} source={{uri: searchResult.photo}} />
              <Text style={styles.name}> {searchResult.firstName + searchResult.lastName} </Text> 
              <View style={styles.addButtonContainer}>
                <TouchableNativeFeedback onPress={this.addFriend.bind(this, searchResult.id)} style={styles.addButton}>
                  <Text>+</Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}

function _mapStateToProps(state) {
  return {
    userId: state.userState.currentUser.userId
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
  subContainer: {
    flexDirection: 'row',
    backgroundColor: '#FBFBFB',
    height: 100
  },
  photo: {
    flex:0.4,
  },
  name: {
    textAlign: 'center',
    flex:0.3
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:0.3,
    height: 25
  },
  addButton: {
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'grey',
  },
  searchButton: {
    flex:1,
    backgroundColor: 'blue'
  },
});