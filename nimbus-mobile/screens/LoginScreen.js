import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Facebook } from 'exponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';

const { width, height } = Dimensions.get('window');
const background = require('../assets/images/background.jpg');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      authToken: null,
      name: null,
    };
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
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
                style={styles.textInput} 
                placeholder="USERNAME"
              />
            </View>

            <View style={styles.textInputWrapper}>
              <TextInput 
                style={styles.textInput} 
                placeholder="PASSWORD"
              />
            </View>

            <TouchableOpacity>
              <View style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </View>
            </TouchableOpacity>            

            <TouchableNativeFeedback>
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

            <TouchableNativeFeedback onPress={this._signInWithFacebook}>
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
              <TouchableOpacity>
                <Text style={styles.signUpText}>Sign up.</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Image>
      </KeyboardAwareScrollView>
    );
  }

  async _signInWithFacebook() {
    const result = await Facebook.logInWithReadPermissionsAsync(
      '1348413101897052', {
      permissions: ['public_profile'],
      behavior: Platform.OS === 'ios' ? 'web' : 'system',
    });

    if (result.type === 'success') {
      let response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
      let info = await response.json();

      console.log('result*******************', result);
      console.log('info*********************', info);


      // this.props.dispatch(Actions.signIn(new User({
      //   id: info.id,
      //   authToken: result.token,
      //   name: info.name,
      //   isGuest: false,
      // })));

      // this.setState({
      //   id: info.id,
      //   authToken: result.token,
      //   name: info.name,
      // });
    }
  }
}

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