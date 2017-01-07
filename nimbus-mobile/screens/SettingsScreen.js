import React from 'react';
import {
  TouchableHighlight,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings'
    },
  }

  logout() {
    this.props.logoutUser();
  }
 
  render() {
    return (
      <ScrollView>
        <View style={styles.cardLabel}>
          <Text style={styles.cardLabelText}>Your account</Text>
        </View>

        <View style={styles.card}>
          <TouchableNativeFeedback
            onPress={this.logout.bind(this)}
            fallback={TouchableHighlight}
            underlayColor="#eee">
            <View style={[styles.cardBody, {flexDirection: 'row'}]}>
              <MaterialIcons
                name="exit-to-app"
                size={25}
                style={{transform: [{rotate: '180deg'}]}}
              />

              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  card: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});
