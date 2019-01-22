const config = {
  credentials: {
    client: {
      id: '',
      secret: '',
    },
    auth: {
      tokenHost: 'https://bp.schul-cloud.org',
      tokenPath: '/hydra/oauth2/token',
      authorizePath: '/hydra/oauth2/auth',
    },
  },
  userinfoPath: '/userinfo',
  redirectUrl: 'http://localhost:3001/auth',
  scHost: 'http://localhost:3030/',
};

export default config;
