import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class FriendsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Friends',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={this.props.route.getContentContainerStyle()}>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
