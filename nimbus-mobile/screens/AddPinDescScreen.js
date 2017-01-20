import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  PickerIOS,
  Switch,
  PickerItemIOS,
  Dimensions,
} from 'react-native';
import Exponent from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';
import { API_URL } from '../environment.js';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class AddPinDescScreen extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      falseSwitchIsOn: false,
  		description: null,
    	privacy: 'private',
    	category: 'Other',
    	privacies: [
        {
          key: 0,
          name: 'private'
        },
        {
          key: 1,
          name: 'public'
        }
      ],
      categories: [
        {
          key: 0,
          name: 'Food',
        },
        {
          key: 1,
          name: 'Exciting',
        },
        {
          key: 2,
          name: 'Dangerous',
        },
        {
          key: 3,
          name: 'Chill',
        },
        {
          key: 4,
          name: 'Gross',
        },
        {
          key: 5,
          name: 'Other'
        }
      ]
  	}
  }

  static route = {
    navigationBar: {
      title: 'Add a Pin',
    },
  }

  render() {
    let { props } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.descriptionBox} 
          multiline={true} 
          numberOfLines={3} 
          returnKeyType='done'
          onKeyPress={this.handleKeyDown}
          onChangeText={(description) => this.setState({description})} 
          placeholder='Write a caption...' 
          value={this.state.description} 
        />

        <View style={styles.catFlex}>
          <Text style={styles.labelText}>Category</Text>
          <PickerIOS
            style={styles.selectMenu}
            selectedValue={this.state.category}
            onValueChange={(category) => this.setState({category, modelIndex: 0})}>
            {this.state.categories.map((category) => (
              <PickerIOS.Item
                key={category.key}
                value={category.name}
                label={category.name}
              />
            ))}
          </PickerIOS>
        </View>

        <View style={styles.privFlex}>
          <Text style={styles.flexText}>Public</Text>
          <Switch
            style={styles.privacyMenu}
            onValueChange={(value) => {
              this.setState({falseSwitchIsOn: value})
              if (value) {
                this.setState({privacy: "public"})
              }
              if (!value) {
                this.setState({privacy: "private"})
              }
            }}
            value={this.state.falseSwitchIsOn}
          />
        </View>

        
        <TouchableOpacity onPress={this._handlePinPost.bind(this)} style={styles.submit} >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleKeyDown = function(e) {
    if(e.nativeEvent.key == "Enter"){
        dismissKeyboard();
    }
  };

  _handlePinPost = async () => {
    var that = this;
    var options = { enableHighAccuracy: true }
    var location = await Exponent.Location.getCurrentPositionAsync(options)
    var pinData = {
      location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        mediaUrl: this.props.route.params.image,
        description: that.state.description,
        privacy: that.state.privacy,
        category: that.state.category
    };
    try {
      let response = await that._postPin(pinData);
      console.log(response);
      that.props.navigator.push('home');
    } catch(e) {
      throw e;
      alert('Pin post failed, sorry :(');
    }
  }

  _postPin = async (pinData) => {
    var postUrl = `${API_URL}/api/users/${this.props.userId}/pins`;
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.authToken}`,
      },
      body:JSON.stringify(pinData),
    };

    return fetch(postUrl, options);
  }

  _goBack() {
    this.props.navigator.push('home');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPinDescScreen);

function mapStateToProps(state) {
  return {
    authToken: state.userState.currentUser.authToken,
    userId: state.userState.currentUser.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00284d',
  },
  submitText: {
    color: 'white',
    fontSize: 18
  },
  descriptionBox: {
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 2,
  },
  catFlex: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    flex: 4, 
  },
  privFlex: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    flex: 1
  },
  submit: {
    backgroundColor: '#2f95dc',
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  privacyMenu: {
    left: width * 0.6,
  },
  labelText: {
    fontSize: 16,
  },
  flexText: {
    top: 5,
    fontSize: 16,
  }
});