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

export default class SettingsScreen extends React.Component {
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

  searchFriends() {
    // fetch all users from DB
    let fullName = this.state.text.split(' ');
    let firstName = fullName[0];
    let lastName = fullName[1];

    fetch(`http://107.170.233.162:1337/api/users?firstName=${firstName}&lastName=${lastName}`,
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
    }).done();
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
          <View style={styles.subContainer}>
            <Image style={styles.photo} source={{uri: searchResult.photo}} />
            <Text style={styles.name}> {searchResult.firstName + searchResult.lastName} </Text> 
            <View style={styles.addButtonContainer}>
              <TouchableNativeFeedback style={styles.addButton}>
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
    backgroundColor: 'white',
    opacity: 0.6,
    borderWidth: 2,
    borderColor: 'grey',
  },
  searchButton: {
    flex:1,
  },
});