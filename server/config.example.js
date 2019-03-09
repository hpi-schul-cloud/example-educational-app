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
  platform: {
    publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1i1lcUZAcdsDxgpup5wT\n' +
    'At67dtUoaN/uvQGNv4UIdjIenZFGF35u42ON9MRGLb3afWqCHZaaZlZIUeb9vODb\n' +
    'T9V2JIhMKoNGo0IsQ4JkStRHtvCRnhGCGZEx/PLvNg/a75GAAc5GHYQccVa5dW4A\n' +
    'ZW08k5cOPFsXYEm5kYun0N5PGbZjM3AZqUQBeZv6QDYLQXMbgDmfyRPQN27fLIY6\n' +
    'xfTVjYTpxBfYujYt1LDm6FiumZ1PpCqTo6WWOdVMrE9z2KypG4yjGmmWTf762c+o\n' +
    'BnldokVJdxlkH/HIbFZJ6AvsDgSO8BKkIykqR4aWpWiclV62ZT2MnotzU+9VxHvC\n' +
    '4wIDAQAB\n' +
    '-----END PUBLIC KEY-----',
    audience: 'http://localhost:3100/',
  },
};

export default config;
