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

const { width, height } = Dimensions.get('window');

export default class SignupScreen extends React.Component {

  login() {
    this.props.navigator.pop();
  }

  signup() {
    console.log('Hello, World!');
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>NIMBUS</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="USERNAME"></TextInput>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="PASSWORD"></TextInput>
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