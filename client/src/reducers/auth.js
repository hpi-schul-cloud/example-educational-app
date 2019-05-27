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
    case AUTH_ACTIONS.SET_IS_EDITABLE:
      return { ...state, isEditable: action.isEditable };
    case AUTH_ACTIONS.SET_LTI_REQUEST:
      return { ...state, ltiRequest: action.request };
    case AUTH_ACTIONS.SET_JWT_TOKEN:
      return { ...state, jwtToken: action.jwtToken };
    default:
      return state;
  }
};
