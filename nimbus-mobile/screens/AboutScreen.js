import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import TouchableNativeFeedback from '@exponent/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@exponent/vector-icons';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions/index.js';
import imgLogo from '../assets/images/logo.png';
import Chris from '../assets/images/ChrisLu.jpg';
import Tim from '../assets/images/TimChin.jpg';
import Steven from '../assets/images/StevenJing.jpg';
import Graham from '../assets/images/GrahamPerich.jpg';

class AboutScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'About Nimbus',
      titleStyle: {
        fontFamily: 'Avenir',
        fontSize: 20,
      },
    },
  }
 
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.logo} source={imgLogo}/>
          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor, ex id posuere sagittis, lorem nisl ultrices tortor, eu venenatis massa ligula id sapien. Aliquam lobortis, metus ut ornare lacinia, elit lectus vestibulum augue, euismod accumsan nunc massa sed erat. Vestibulum in cursus libero. Nulla malesuada sollicitudin elit, nec pharetra quam fermentum eget. Etiam mattis dolor sit amet aliquam imperdiet. Duis nec pretium risus, convallis rutrum dui. Ut non mauris et augue lobortis fermentum nec ut dui. Vestibulum sollicitudin augue ac risus varius, dictum vehicula sem maximus. Suspendisse potenti. Donec rutrum turpis et ultricies maximus. Aenean suscipit nisl sed metus egestas ornare. Mauris id elementum velit. Phasellus ut ultrices dui, nec sagittis nisi.
            </Text>
          </View>
          <Text style={styles.founderTitle}>Meet the Founders</Text>
          <Swiper height={280} showPagination={true} loop={false} activeDotColor={'#1B8FFF'} dotColor={'#9B9FA4'} >
            <View style={styles.founderCard}>
              <Image style={styles.founderImg} source={Chris} />
              <Text style={styles.founderText}>Chris Lu</Text>
            </View>
            <View style={styles.founderCard}>
              <Image style={styles.founderImg} source={Steven} />
              <Text style={styles.founderText}>Steven Jing</Text>
            </View>
            <View style={styles.founderCard}>
              <Image style={styles.founderImg} source={Graham} />
              <Text style={styles.founderText}>Graham Perich</Text>
            </View>
            <View style={styles.founderCard}>
              <Image style={styles.founderImg} source={Tim} />
              <Text style={styles.founderText}>Tim Chin</Text>
            </View>
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00284d',
  },
  logo: {
    height: 160,
    width: 160,
  },
  introContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
  },
  introText: {
    borderRadius: 15,
    fontFamily: 'Avenir',
    margin: 10,
  },
  founderCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  founderImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  founderTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Avenir',
    color: 'white',
  },
  founderText: {
    color: 'white',
    fontFamily: 'Avenir',
  }
});
