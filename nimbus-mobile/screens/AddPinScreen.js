import React from 'react';
import {
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

  _goBack() {
    this.props.navigator.pop();
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

        <TextInput style={styles.descriptionBox} multiline={false} numberOfLines={2} onChangeText={(text) => this.setState({text})} placeholder='Enter a description...' value={this.state.description}/>
        
        <TouchableOpacity style={styles.pickImageContainer} onPress={this._goBack.bind(this)}>
          <View>
            <Text style={styles.pickImageText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
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
