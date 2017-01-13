import * as UserActions from './UserActions.js';
import * as FriendActions from './FriendActions.js';
import * as AuthActions from './AuthActions.js';

export const ActionCreators = Object.assign({},
  UserActions,
  FriendActions,
  AuthActions,
);