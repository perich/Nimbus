import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';

export default class FriendsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }

  static route = {
    navigationBar: {
      title: 'Friends',
    },
  }

  componentWillMount() {
    var that = this;
    console.log('Fetching all users...');
    fetch('http://107.170.233.162:1337/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data is: ', data);
      var friends = [];
      for (var i = 0; i < data.length; i++) {
        friends.push({
          id: data[i].id,
          firstName: data[i].firstName,
          lastName: data[i].lastName,
          profileURL: data[i].photo,
          email: data[i].email === 'No email' ? 'Facebook User' : data[i].email,
        });
      }
      that.setState({
        friends: friends,
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  goToFriend(friend) {
    this.props.navigator.push('friendProfile', friend);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.friends.map(friend => (
            <View style={styles.card} key={friend.id}>
              <TouchableNativeFeedback onPress={this.goToFriend.bind(this, friend)} fallback={TouchableHighlight} underlayColor="#eee">
                <View style={[styles.cardBody, {flexDirection: 'row'}]}>
                  <MaterialIcons
                    name="account-circle"
                    size={25}
                  />
                  <Text style={styles.signOutText}>{friend.firstName} {friend.lastName}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  card: {
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
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});