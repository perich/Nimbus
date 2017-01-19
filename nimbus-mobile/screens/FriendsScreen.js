import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';
import AddFriendButton from '../components/AddFriendButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';

class FriendsScreen extends React.Component {

  static route = {
    navigationBar: {
      title: 'Friends',
      tintColor: 'white',
      titleStyle: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 20,
      },
      backgroundColor: '#00284d',
      renderRight: function() {
        return (
            <AddFriendButton 
              buttonStyle={styles.addFriendButton}
              textStyle={styles.addFriendButtonText}
            />
        );
      },
    }
  }

  componentDidMount() {
    this.props.getFriends(this.props.userId);
  }

  goToFriend(friend) {
    this.props.setFriend(friend);
    this.props.navigator.push('friendProfile', friend);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.friends.map(friend => (
            <View style={styles.card} key={friend.id}>
              <TouchableNativeFeedback 
                onPress={this.goToFriend.bind(this, friend)} 
                fallback={TouchableHighlight} 
                underlayColor="#eee"
              >
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

function mapStateToProps(state) {
  return {
    userId: state.userState.currentUser.userId,
    friends: state.userState.friends,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);

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
  addFriendButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendButtonText: {
    color: 'white',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 15,
    marginRight: 10,
  },
  addFriendText: {
    marginTop: 12,
    marginRight: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
  },
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});