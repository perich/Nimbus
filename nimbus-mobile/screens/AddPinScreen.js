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
  PickerItemIOS,
} from 'react-native';
import Exponent from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';

class AddPinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      description: null,
      category: null,
      isPublic: false,
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
          name: 'Other',
        },
      ]
    }
  }

  static route = {
    navigationBar: {
      title: 'Add a Pin Post',
    },
  }

  render() {
    let { image } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.pickImageContainer} onPress={this._pickImage}>
            <View>
              <Text style={styles.pickImageText}>Pick an image from camera roll</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickImageContainer} onPress={this._takePhoto}>
            <View>
              <Text style={styles.pickImageText}>Take a Photo</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.photoContainer}>
          {image &&
            <Image source={{uri: image}} style={{width: 200, height: 200}} /> }
          </View>
        </View>

        <TextInput 
          style={styles.descriptionBox} 
          multiline={false} 
          numberOfLines={2} 
          onChangeText={(description) => this.setState({description})} 
          placeholder='Enter a description...' 
          value={this.state.description} 
        />

        <Text>Pick a category:</Text>
        <PickerIOS
          style={styles.selectMenu}
          selectedValue={this.state.category}
          onValueChange={(category) => this.setState({category, modelIndex: 0})}>
          {this.state.categories.map((category) => (
            <PickerItemIOS
              key={category.key}
              value={category.name}
              label={category.name}
            />
          ))}
        </PickerIOS>
      
        <TouchableOpacity style={styles.pickImageContainer} onPress={this._handlePinPost.bind(this)}>
          <View>
            <Text style={styles.pickImageText}>Submit</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    );
  }

  _handlePinPost = async () => {
    var that = this;
    var pinData = {};
    navigator.geolocation.getCurrentPosition(async function(location) {
      pinData = {
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        mediaUrl: that.state.image,
        description: that.state.description,
        category: 'Other'
      };

      try {
        let response = await that._postPin(pinData);
        that.props.navigator.pop();
      } catch(e) {
        throw e;
        alert('Pin post failed, sorry :(');
      }
    })
  }

  _postPin = async (pinData) => {
    var postUrl = 'http://107.170.233.162:1337/api/users/' + this.props.userId + '/pins';
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(pinData),
    };

    return fetch(postUrl, options);
    console.log(pinData);
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        uploadResponse = await this.uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({image: uploadResult.location});
      }
    } catch(e) {
      throw e;
      alert('Upload failed, sorry :(');
    }
  }

  uploadImageAsync = async (uri) => {
    let apiUrl = `http://107.170.233.162:1337/upload`;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options);
  }

  _takePhoto = async () => {
    let pickerResult = await Exponent.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _pickImage = async () => {
    let pickerResult = await Exponent.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _goBack() {
    this.props.navigator.pop();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPinScreen);

function mapStateToProps(state) {
  return {
    userId: state.userState.currentUser.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  pickImageContainer: {
    backgroundColor: '#2f95dc',
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  pickImageText: {
    color: 'white',
  },
  photoContainer: {
    width: 200,
    height: 200,
    margin: 5,
  },
  descriptionBox: {
    height: 40,
    margin: 5,
    paddingTop: 15,
  },
  selectMenu: {
    height: 200,
  },
  addPhotoContainer: {
    flex: 5,
    backgroundColor: 'skyblue',
  }
});
