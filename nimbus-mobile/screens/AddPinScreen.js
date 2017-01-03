import React from 'react';
import {
  View,
  Text,
  Image,
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
    }
  }

  static route = {
    navigationBar: {
      title: 'Add a Pin Post',
    },
  }

  _pickImage = async () => {
    let result = await Exponent.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  _takePhoto = async () => {
    let result = await Exponent.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this._pickImage}>
          <View>
            <Text>Pick an image from camera roll</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._takePhoto}>
          <View>
            <Text>Take a Photo</Text>
          </View>
        </TouchableOpacity>

        {image &&
          <Image source={{uri: image}} style={{width: 200, height: 200}} /> }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  addPhotoContainer: {
    flex: 5,
    backgroundColor: 'skyblue',
  }
});
