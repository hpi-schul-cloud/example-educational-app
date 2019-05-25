const config = {
  credentials: {
    client: {
      id: 'dummy',
      secret: 'Kvzdxcip5GO6',
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
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+viuhvIetIbtlk9ruoYD\n' +
    'ToKYY91hynOdE/ILoETDfVzXWnzUVD+IMeA3Lqwhu0LxsqJ4b2jaiXIYfn3VDj4z\n' +
    'G7FBDgumR8h+N1TK9FbL9LUlUf68vEbArkSEyCbwkgXlTo1KrHiCOdyahMjM0aIv\n' +
    'wJyRMhoxDXKe3VbzR4p2IKh1rGo4RRZNZdzdy3yXFuyR5wUg5N9n5wVxy87bG4Db\n' +
    'LIgun/O2WzUyJHSvh9Jd76XczmmvvesOw0RjhOCPw50N0NWhUIAESO4jAU+9z4zA\n' +
    'OnkfNSOKI+AT1k0Et3AB82Z+lrH+/iWsz1GUUK5f6pBvxRYKBVaO4KEMHaTWOcjO\n' +
    'KwIDAQAB\n' +
    '-----END PUBLIC KEY-----',
    audience: 'http://localhost:3100/',
  },
};

export default config;
