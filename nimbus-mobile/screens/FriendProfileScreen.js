import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Components
} from 'exponent';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class FriendProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${params.user}'s Profile`;
      }
    },
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.pictureContainer} source={{uri: this.props.route.params.profilePic}}>
            <Components.BlurView tint="default" intensity={90} style={StyleSheet.absoluteFill}>
              <View style={styles.pictureDetails}>
                <Image style={styles.picture} source={{uri: this.props.route.params.profilePic}}/>
              </View>
            </Components.BlurView>
          </Image>
          <Text style={styles.name}>{this.props.route.params.user}</Text>
          <Text style={styles.email}>{this.props.route.params.email}</Text>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
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