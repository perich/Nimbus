import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import FriendProfileScreen from '../screens/FriendProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPinScreen from '../screens/AddPinScreen';
import AddFriendScreen from '../screens/AddFriendScreen';
import AddFriendButton from '../components/AddFriendButton';
import PinScreen from '../screens/PinScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  login: () => LoginScreen,
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
}));
