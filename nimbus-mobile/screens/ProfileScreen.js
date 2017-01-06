import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Components
} from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';

const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 1424212884257136,
      profileURL: '../assets/images/profilePlaceholder.png',
    }
  }

  static route = {
    navigationBar: {
      title: 'Profile',
      renderRight: () => 
        <TouchableOpacity style={styles.editButton} onPress={this.editProfile}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
    },
  }

  componentWillMount() {
    var that = this;
    console.log('Fetching user...');
    fetch('http://107.170.233.162:1337/api/users/' + this.state.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data is: ', data);
      that.setState({
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        profileURL: data[0].photo,
        email: data[0].email,
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  editProfile() {
    window.alert('Power Overwhelming');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.pictureContainer} source={{uri: this.state.profileURL}}>
            <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
              <View style={styles.pictureDetails}>
                <Image style={styles.picture} source={{uri: this.state.profileURL}}/>
              </View>
            </Components.BlurView>
          </Image>
          <Text style={styles.name}>{this.state.firstName} {this.state.lastName}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    marginTop: 10,
    marginRight: 10,
    textAlign: 'center',
    color: 'blue',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  pictureContainer: {
    height: 200,
  },
  blur: {
    height: 200,
  },
  pictureDetails: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    height: 135,
    width: 135,
    borderRadius: 67,
  },
  name: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
  email: {
    textAlign: 'center',
    padding: 3,
  }
});