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
} from 'react-native';
import Exponent from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class AddPinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      description: null,
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

        <TextInput style={styles.descriptionBox} multiline={false} numberOfLines={2} onChangeText={(text) => this.setState({text})} placeholder='Enter a description...' value={this.state.description} />
        
        <TouchableOpacity style={styles.pickImageContainer} onPress={this.postPin.bind(this)}>
          <View>
            <Text style={styles.pickImageText}>Submit</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    );
  }

  _pickImage = async () => {
    let pickerResult = await Exponent.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
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
      console.log({uploadResponse});
      console.log({uploadResult});
      console.log({e});
      throw e;
      alert('Upload failed, sorry :(');
    }
  }

  uploadImageAsync = async (uri) => {
    let apiUrl = `http://localhost:1337/upload`;

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
    let result = await Exponent.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  _goBack() {
    this.props.navigator.pop();
  }
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
  addPhotoContainer: {
    flex: 5,
    backgroundColor: 'skyblue',
  }
});
