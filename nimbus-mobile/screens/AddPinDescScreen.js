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
      trueSwitchIsOn: true,
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
      <ScrollView style={styles.container}>
        <TextInput 
          style={styles.descriptionBox} 
          multiline={false} 
          numberOfLines={4} 
          onChangeText={(description) => this.setState({description})} 
          placeholder='Write a caption...' 
          value={this.state.description} 
        />
        <Text style={styles.labelText}>Category:</Text>
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

        <Text style={styles.labelText}>Public</Text>
        <Switch
          style={styles.privacyMenu}
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          value={this.state.falseSwitchIsOn}
          onChange={(checked) => {
            if (checked === false && this.state.privacy === "private") {
              this.state.privacy = "public"
            }
            if (checked === true && this.state.privacy === "public") {
              this.state.privacy = "private"
            }
          }} 
        />

        
        <TouchableOpacity onPress={this._handlePinPost.bind(this)} style={styles.submit} >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

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
    console.log(pinData);
  }

  _goBack() {
    this.props.navigator.pop();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPinDescScreen);

function mapStateToProps(state) {
  return {
    authToken: state.userState.currentUser.authToken,
    userId: state.userState.currentUser.userID,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  submit: {
    backgroundColor: '#2f95dc',
    height: 60,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -108,
  },
  submitText: {
    color: 'white',
    fontSize: 16
  },
  descriptionBox: {
    height: 100,
    margin: 5,
    paddingTop: 15,
  },
  selectMenu: {
    height: 200,
  },
  privacyMenu: {

  },
  labelText: {
    fontSize: 16,
  },
});