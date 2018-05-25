import { AUTH_ACTIONS } from '../consts/action_types';
import { AUTH } from '../consts/default_state';

export default (state = AUTH, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.isAuthenticated };
    case AUTH_ACTIONS.TOKEN_SET:
      return { ...state, accessToken: action.accessToken };
    case AUTH_ACTIONS.AUTHORIZE_URI_SET:
      return { ...state, authorizeUri: action.uri };
    default:
      return state;
  }
};
