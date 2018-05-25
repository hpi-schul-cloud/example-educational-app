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
};

export default config;
