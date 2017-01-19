import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Notifications,
  Location
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
  NavigationProvider,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
  Ionicons,
} from '@exponent/vector-icons';

import Router from './Router';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions/index.js';
import { bindActionCreators } from 'redux';

class RootNavigation extends React.Component {
  
  componentDidMount() {
    
    this._notificationSubscription = this._registerForPushNotifications();
    
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    if (!this.props.isAppReady) {
      return (
        <StackNavigation initialRoute={Router.getRoute('login')} />)
    } else {
      return (
        <TabNavigation
          tabBarColor={'#00284d'}
          tabBarHeight={56}
          initialTab="home">

          <TabNavigationItem
            id="home"
            renderIcon={isSelected => this._renderIcon('md-home', isSelected)}>
            
            <StackNavigation initialRoute={Router.getRoute('home')} />
          </TabNavigationItem>

          <TabNavigationItem
            id="profile"
            renderIcon={isSelected => this._renderIcon('md-person', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('profile')}/>
          </TabNavigationItem>

          <TabNavigationItem
            id="friends"
            renderIcon={isSelected => this._renderIcon('md-people', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('friends')}/>
          </TabNavigationItem>
        </TabNavigation>
      );
    }
  }

  _renderIcon(name, isSelected) {
    return (
      <Ionicons
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);

function mapStateToProps(state) {
  return {
    id: state.userState.id,
    authToken: state.userState.authToken,
    name: state.userState.name,
    currentUser: state.userState.currentUser,
    isAppReady: state.authState.isAppReady,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
