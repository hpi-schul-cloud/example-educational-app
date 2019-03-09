import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import oauth2 from 'simple-oauth2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import Router from 'express-promise-router';
import fetch from 'isomorphic-fetch';
import reducers from '../../client/src/reducers/index';
import {
  setAuthorizeUri,
  setIsAuthenticated,
  setIsEditable,
  setLtiRequest,
} from '../../client/src/actions/auth_actions';
import {
  setRole,
  setPseudonym,
  setGroup,
  setStudents,
  setTeachers,
} from '../../client/src/actions/roster_actions';
import App from '../../client/src/app';
import config from '../config';

const router = new Router();

const generateNonce = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.post('*', async (req, res) => {
  const store = createStore(reducers);

  // checking integrity, signature and expiration time
  const idToken = jwt.verify(req.body.id_token,
    config.platform.publicKey,
    { algorithm: 'RS256' });

  if (idToken.iss !== config.platform.url) {
    throw new Error('Issuer not matching');
  }

  if (idToken.aud !== config.credentials.client.id) {
    throw new Error('Audience not matching');
  }

  // TODO: iat, and nonce check

  store.dispatch(setIsAuthenticated(true));
  store.dispatch(setPseudonym(idToken.sub));
  store.dispatch(setRole(idToken['https://purl.imsglobal.org/spec/lti/claim/roles'][0]));
  if (idToken['https://purl.imsglobal.org/spec/lti/claim/message_type'] ===
      'LtiDeepLinkingRequest') {
    store.dispatch(setIsEditable(true));
    store.dispatch(setLtiRequest(idToken));
  }

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render('../views/index.ejs', {
      html,
      script: JSON.stringify(finalState),
    });
  }
});

router.get('/deeplink', async (req, res) => {
  const current = new Date();
  const idToken = {
    iss: config.credentials.client.id,
    aud: config.platform.url,
    sub: '',
    exp: current.getTime() + (3 * 60),
    iat: current.getTime(),
    nonce: generateNonce(16),
    'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiDeepLinkingResponse',
    'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
    'https://purl.imsglobal.org/spec/lti/claim/deployment_id': req.query.deployment_id,
    'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': {
      type: 'ltiLink',
      url: req.query.link_url,
      title: req.query.title,
    },
  };
  const response = jwt.sign(idToken, fs.readFileSync('private_key.pem'), { algorithm: 'RS256' });
  res.status(200).render('../views/lti.ejs', {
    url: req.query.return_url,
    idToken: response,
  });
});

router.get('/*', async (req, res) => {

  const store = createStore(reducers);

  if (req.query.logout) {
    req.session.accessToken = null;
  }

  // generate OAuth2 auth URI for redirection
  const oauth = oauth2.create(config.credentials);
  const authorizationUri = oauth.authorizationCode.authorizeURL({
    redirect_uri: config.redirectUrl,
    scope: 'openid',
    state: JSON.stringify({ isEditable: (req.query.edit === '1') }), // misusing the state
  });
  store.dispatch(setAuthorizeUri(authorizationUri));

  // request access token
  if (req.query.code) {
    const tokenConfig = {
      code: req.query.code,
      redirect_uri: config.redirectUrl,
      scope: 'openid',
    };
    const state = JSON.parse(req.query.state);
    store.dispatch(setIsEditable(state.isEditable));

    try {
      const result = await oauth.authorizationCode.getToken(tokenConfig);
      req.session.accessToken = oauth.accessToken.create(result);
    } catch (ex) {
      console.log('Access Token Error: ', ex);
    }
  }

  const accessToken = req.session.accessToken || undefined;
  store.dispatch(setIsAuthenticated(!!accessToken));

  if (req.session.role && accessToken) {
    store.dispatch(setRole(req.session.role));
    store.dispatch(setPseudonym(req.session.pseudonym));
    store.dispatch(setGroup(req.session.group));
    store.dispatch(setStudents(req.session.students));
    store.dispatch(setTeachers(req.session.teachers));
  } else if (accessToken) {
    const responseUserinfo = await fetch(
      `${config.credentials.auth.tokenHost}${config.userinfoPath}`,
      { headers: { Authorization: 'Bearer ' + accessToken.token.access_token } },
    );
    const userinfo = await responseUserinfo.json();
    store.dispatch(setPseudonym(userinfo.sub));
    const responseMetadata = await fetch(
      `${config.scHost}roster/users/${encodeURIComponent(userinfo.sub)}/metadata`,
      { headers: { Authorization: accessToken.token.access_token } },
    );
    const metadata = await responseMetadata.json();
    store.dispatch(setRole(metadata.data.type));
    // save to session
    req.session.pseudonym = userinfo.sub;
    req.session.role = metadata.data.type;

    const responseGroups = await fetch(
      `${config.scHost}roster/users/${encodeURIComponent(userinfo.sub)}/groups`,
      { headers: { Authorization: accessToken.token.access_token } },
    );
    const groups = await responseGroups.json();

    if (groups.data.groups.length) { // part of a group
      store.dispatch(setGroup(groups.data.groups[0].name));
      const responseUsers = await fetch(
        `${config.scHost}roster/groups/${groups.data.groups[0].group_id}`,
        { headers: { Authorization: accessToken.token.access_token } },
      );

      const users = await responseUsers.json();
      store.dispatch(setStudents(users.data.students));
      store.dispatch(setTeachers(users.data.teachers));

      req.session.group = groups.data.groups[0].name;
      req.session.students = users.data.students;
      req.session.teachers = users.data.teachers;
    }
  }

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render('../views/index.ejs', {
      html,
      script: JSON.stringify(finalState),
    });
  }
});


export default router;
