import { AUTH_ACTIONS } from '../consts/action_types';

export const setIsAuthenticated = isAuthenticated => ({
  type: AUTH_ACTIONS.SET_IS_AUTHENTICATED,
  isAuthenticated,
});

export const setToken = accessToken => ({
  type: AUTH_ACTIONS.TOKEN_SET,
  accessToken,
});

export const setAuthorizeUri = uri => ({
  type: AUTH_ACTIONS.AUTHORIZE_URI_SET,
  uri,
});
