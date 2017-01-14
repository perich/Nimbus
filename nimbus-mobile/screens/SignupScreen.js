import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';

import { API_URL } from '../environment.js';
const { width, height } = Dimensions.get('window');

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    };
  }

  login() {
    this.props.navigator.pop();
  }

  signup() {
    fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // if response is successful, redirect the user to the login page
      // otherwise, alert the user of error
      if (data.success) {
        alert(data.success);
        this.props.navigator.pop();
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error('SignupScreen: An error occurred when posting to /api/users');
      throw error;
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>NIMBUS</Text>
      </View>

      <View style={styles.body}>

        <View style={styles.inputWrapper}>
          <TextInput 
            name={'firstname'}
            style={styles.input} 
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={32}
            placeholderTextColor={'#3b5998'}
            selectionColor={'blue'}
            placeholder="FIRSTNAME"
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onChangeText={(firstName) => this.setState({ firstName })}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput 
            name={'lastname'}
            style={styles.input} 
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={32}
            placeholderTextColor={'#3b5998'}
            selectionColor={'blue'}
            placeholder="LASTNAME"
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onChangeText={(lastName) => this.setState({ lastName })}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput 
            name={'email'}
            style={styles.input} 
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={32}
            placeholderTextColor={'#3b5998'}
            selectionColor={'blue'}
            placeholder="EMAIL"
            keyboardType={'email-address'}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput 
            name={'password'}
            style={styles.input} 
            autoCapitalize={'none'}
            autoCorrect={false}
            maxLength={32}
            placeholderTextColor={'#3b5998'}
            selectionColor={'blue'}
            placeholder="PASSWORD"
            returnKeyType={'done'}
            withRef={true}
            secureTextEntry={false}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableNativeFeedback onPress={this.signup.bind(this)}>
          <View style={styles.signupButton}>
            <Text style={styles.signupButtonText}>SIGNUP</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

        <View style={styles.footer}>
          <Text>Already have an account?</Text>
          <TouchableNativeFeedback onPress={this.login.bind(this)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableNativeFeedback>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 60,
    fontFamily: 'SnellRoundhand-Bold',
    color: '#3b5998',
  },
  input: {
    height: 40,
    width: 0.9 * width,
    borderWidth: 1, 
    borderColor: '#3b5998',
    borderRadius: 5,
    textAlign: 'center',
  },
  inputWrapper: {
    padding: 5,
  },
  loginText: {
    fontStyle: 'italic',
    paddingTop: 5,
    paddingBottom: 10,
  },
  signupButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowRadius: 2,
    shadowOpacity: .4,
    shadowOffset: {width: 0, height: 2},
  },
  signupButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});