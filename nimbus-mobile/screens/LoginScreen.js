import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';

import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import Router from '../navigation/Router';

const { width, height } = Dimensions.get('window');
const background = require('../assets/images/background.jpg');

class Login extends React.Component {
  goToSignUp() {
    this.props.navigator.push('signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={background} 
          style={styles.background} 
          resizeMode="cover">
  
          <View style={styles.wrapper}>
            <View style={styles.loginHeader}>
              <Text style={styles.loginHeaderText}>
                NIMBUS
              </Text>
            </View>

            <View style={styles.textInputWrapper}>  
              <TextInput 
                name={'username'}
                style={styles.textInput} 
                autoCapitalize={'none'}
                autoCorrect={false}
                maxLength={32}
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                selectionColor={'blue'}
                placeholder="EMAIL"
                keyboardType={'email-address'}
                returnKeyType={'next'}
                blurOnSubmit={false}
                withRef={true}
                onChangeText={(value) => this.props.setUsername(value)}
              />
            </View>

            <View style={styles.textInputWrapper}>
              <TextInput 
                name={'password'}
                style={styles.textInput} 
                autoCapitalize={'none'}
                autoCorrect={false}
                maxLength={32}
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                selectionColor={'blue'}
                placeholder="PASSWORD"
                returnKeyType={'done'}
                withRef={true}
                secureTextEntry={false}
                onChangetext={(value) => this.props.setPassword(value)}
              />
            </View>

            <TouchableOpacity>
              <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableNativeFeedback 
              onPress={this.props.login}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>
                  LOGIN
                </Text>
              </View>
            </TouchableNativeFeedback>

            <View>
              <Text style={styles.orText}>
                or
              </Text>
            </View>

            <TouchableNativeFeedback onPress={this.props.signInWithFacebook}>
              <View style={styles.facebookButton}>
                <Text style={styles.facebookButtonText}>
                  Sign in with Facebook
                </Text>
              </View>
            </TouchableNativeFeedback>

            <View style={styles.signUp}>
              <Text>
                Don't have an account yet? 
              </Text>
              <TouchableOpacity onPress={this.goToSignUp.bind(this)}>
                <Text style={styles.signUpText}>Sign up.</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Image>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  wrapper: {
    alignItems: 'center',
  },
  background: {
    width,
    height,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 5,
    width: 250,
    margin: 5,
  },
  facebookButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  forgotPassword: {
    paddingBottom: 5,
  },
  forgotPasswordText: {
    fontStyle: 'italic',
  },
  loginButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 5,
    width: 250,
    margin: 5,
  },
  loginButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  loginHeader: {
    paddingBottom: 0.08 * height,
    paddingTop: 0.24 * height,
  },
  loginHeaderText: {
    fontSize: 60,
    fontFamily: 'SnellRoundhand-Bold',
    color: '#3b5998',
  },
  or: {

  },
  orText: {
    fontStyle: 'italic',
  },
  signUp: {
    alignItems: 'flex-end',
  },
  signUpText: {
    fontStyle: 'italic',
  },
  textInput: {
    height: 40, 
    borderWidth: 1, 
    borderColor: '#3b5998', 
    borderRadius: 5,
    textAlign: 'center',
  },
  textInputWrapper: {
    padding: 5,
    width: 0.9 * width,
  },
});