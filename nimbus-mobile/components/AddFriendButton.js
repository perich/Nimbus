import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
export default class AddFriendButton extends React.Component {
  constructor(props) {
    super(props)
  }  
  addFriend() {
    this.props.navigator.push('addFriend');
  }
  render() {
    return (
      <TouchableOpacity onPress={this.addFriend.bind(this)}>
        <Text>Add Friend</Text>
      </TouchableOpacity>
    );
  }
}