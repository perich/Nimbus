import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Components
} from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';

const { width, height } = Dimensions.get('window');

class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
      renderRight: () => 
        <TouchableOpacity style={styles.editButton} onPress={this.editProfile}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
    },
  }

  editProfile() {
    window.alert('Power Overwhelming');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.pictureContainer} source={{uri: this.props.profileURL}}>
            <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
              <View style={styles.pictureDetails}>
                <Image style={styles.picture} source={{uri: this.props.profileURL}}/>
              </View>
            </Components.BlurView>
          </Image>
          <Text style={styles.name}>{this.props.firstName} {this.props.lastName}</Text>
          <Text style={styles.email}>{this.props.email}</Text>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.userState.currentUser,
    userId: state.userState.currentUser.userId,
    firstName: state.userState.currentUser.firstName,
    lastName: state.userState.currentUser.lastName,
    email: state.userState.email,
    profileURL: state.userState.currentUser.profileUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    marginTop: 10,
    marginRight: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  pictureContainer: {
    height: 200,
  },
  blur: {
    height: 200,
  },
  pictureDetails: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    height: 135,
    width: 135,
    borderRadius: 67,
  },
  name: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  email: {
    textAlign: 'center',
    padding: 3,
  }
});