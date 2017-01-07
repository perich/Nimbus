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

  goToSignUp() {
    this.props.navigator.push('signup');
  }

  login() {
    this.props.navigator.push('rootNavigation');
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

            <TouchableNativeFeedback onPress={this.login.bind(this)}>
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

            <TouchableNativeFeedback onPress={this._signInWithFacebook.bind(this)}>
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

  async _signInWithFacebook() {
    const result = await Facebook.logInWithReadPermissionsAsync(
      // Steven's FB Key, put in environment variable
      '1348413101897052', {
      permissions: ['public_profile', 'user_photos'],
      behavior: Platform.OS === 'ios' ? 'web' : 'system',
    });

    if (result.type === 'success') {
      let response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}&fields=id,name`);
      let info = await response.json();
      // gets larger user photo
      let userPhoto = await fetch(`https://graph.facebook.com/${info.id}/picture?type=large`);

      console.log('result*******************', result);
      console.log('info*********************', info);

      this.props.navigator.push('rootNavigation');
  
      let fullName = info.name.split(' ');
      let firstName = fullName[0];
      let lastName = fullName[1];

      fetch('http://107.170.233.162:1337/api/users/', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          "fbID": info.id,
          "photoUrl": userPhoto.url
        })
      })
        .then(function (result) {
          if (result.status === 201) {
            // do something with the data
            // return result.json();
          }
        })
        .catch(function (err) {
          console.log("*** ERROR ***");
          console.log(err);
        });
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