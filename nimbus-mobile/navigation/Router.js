import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import FriendProfileScreen from '../screens/FriendProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPinScreen from '../screens/AddPinScreen';
import AddPinDescScreen from '../screens/AddPinDescScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import AddFriendButton from '../components/AddFriendButton';
import PinScreen from '../screens/PinScreen';
import RootNavigation from './RootNavigation';

import FreshLoginScreen from '../screens/FreshLoginScreen';

export default createRouter(() => ({
  login: () => FreshLoginScreen,
  signup: () => SignupScreen,
  home: () => HomeScreen,
  friends: () => FriendsScreen,
  profile: () => ProfileScreen,
  settings: () => SettingsScreen,
  addPin: () => AddPinScreen,
  addFriend: () => AddFriendScreen,
  addFriendButton: () => AddFriendButton,
  rootNavigation: () => RootNavigation,
  pinView: () => PinScreen,
  friendProfile: () => FriendProfileScreen,
  addPinDesc: () => AddPinDescScreen
}));
