import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../LoginContainers/CustomButton'
import CustomTextInput from '../LoginContainers/CustomTextInput'
import metrics from '../../config'

import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { API_URL } from '../../environment'

class SignupForm extends Component {
  static propTypes = {
    onLoginLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
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
      if (data.success) {
        alert(data.success);
        this.props.onLoginLinkPress();
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error('SignupScreen: An error occurred when posting to /api/users');
      throw error;
    });
  }

  render () {
    const { email, password, fullName } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress, onHomePress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>

          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'First Name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ firstName: value })}
            isEnabled={!isLoading}
          />

          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Last Name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ lastName: value })}
            isEnabled={!isLoading}
          />

          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />

          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />

        </View>
        <View style={styles.footer}>

          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this.signup.bind(this)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>

          <View style={styles.formNav}>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={onHomePress}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
            {'Back'}
            </Text>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={onLoginLinkPress}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
            {' - or - '}
            </Text>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={onLoginLinkPress}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
              {'Already have an account?'}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.authState.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center',
  },
  createAccountButton: {
    backgroundColor: 'white',
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontFamily: 'Avenir',
  },
  formNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    paddingVertical: 15,
    fontFamily: 'Avenir',
  }
})