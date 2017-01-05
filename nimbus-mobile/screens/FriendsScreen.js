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
      friends: [
        {
          id: 0,
          user: 'Peter Parker',
          profilePic: 'http://rkuykendall.com/assets/where-to-start-reading-spiderman/thumb-usm1.jpg',
          email: 'spider.man@avengers.com',
        },
        {
          id: 1,
          user: 'Carol Denver',
          profilePic: 'http://vignette2.wikia.nocookie.net/avengersalliance2/images/9/94/CaptainmarvelMN_5_fly-fight-win.png/revision/latest?cb=20160413181359',
          email: 'ms.marvel@avengers.com',
        }
      ]
    }
  }

  static route = {
    navigationBar: {
      title: 'Friends',
    },
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
                  <Text style={styles.signOutText}>{friend.user}</Text>
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
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});