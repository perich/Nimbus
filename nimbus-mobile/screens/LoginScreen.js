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

const { width, height } = Dimensions.get('window');
const background = require('../assets/images/background.jpg');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
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
              <Text style={styles.loginHeaderText}>L O G I N</Text>
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

            <View style={styles.forgotPassword}>
              <Text>Forgot Password?</Text>
            </View>
            
            <TouchableOpacity>
              <View style={styles.loginButton}>
                <Text>LOGIN</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  loginButton: {

  },
  loginHeader: {
    paddingBottom: 0.10 * height,
    paddingTop: 0.25 * height,
  },
  loginHeaderText: {
    fontSize: 60,
  },
  textInput: {
    height: 40, 
    borderWidth: 1, 
    borderColor: 'darkblue', 
    textAlign: 'center',
  },
  textInputWrapper: {
    padding: 10,
    width: 0.9 * width,
  },
  wrapper: {
    alignItems: 'center',
  },
});