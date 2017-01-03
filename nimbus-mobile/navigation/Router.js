import {
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPinScreen from '../screens/AddPinScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  friends: () => FriendsScreen,
  profile: () => ProfileScreen,
  settings: () => SettingsScreen,
  addPin: () => AddPinScreen,
  rootNavigation: () => RootNavigation,
}));
