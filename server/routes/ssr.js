import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import oauth2 from 'simple-oauth2';
import Router from 'express-promise-router';
import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';
import reducers from '../../client/src/reducers/index';
import {
  setAuthorizeUri,
  setIsAuthenticated,
} from '../../client/src/actions/auth_actions';
import { addItem } from '../../client/src/actions/list_actions';
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

router.get('/', async (req, res) => {
  const store = createStore(reducers);

  store.dispatch(addItem({
    name: 'middleware',
    description: `Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.
    It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.`,
  }));

  if (req.query.logout) {
    req.session.accessToken = null;
  }

  // generate OAuth2 auth URI for redirection
  const oauth = oauth2.create(config.credentials);
  const authorizationUri = oauth.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth',
    scope: 'openid',
    state: 'blablablabla',
  });
  store.dispatch(setAuthorizeUri(authorizationUri));

  // request access token
  if (req.query.code) {
    const tokenConfig = {
      code: req.query.code,
      redirect_uri: 'http://localhost:3000/auth',
    };

    try {
      const result = await oauth.authorizationCode.getToken(tokenConfig);
      req.session.accessToken = oauth.accessToken.create(result);
    } catch (ex) {
      console.log('Access Token Error: ', ex);
    }
  }

  const accessToken = (req.session.accessToken
    ? req.session.accessToken
    : null
  );

  store.dispatch(setIsAuthenticated(!!accessToken));

  if (req.session.role) {
    store.dispatch(setRole(req.session.role));
    store.dispatch(setPseudonym(req.session.pseudonym));
    store.dispatch(setGroup(req.session.group));
    store.dispatch(setStudents(req.session.students));
    store.dispatch(setTeachers(req.session.teachers));
  } else if (accessToken) {
    const { sub } = jwt.decode(accessToken.token.id_token);
    store.dispatch(setPseudonym(sub));
    // console.log(accessToken.token.access_token);
    const responseMetadata = await fetch(
      `https://bp.schul-cloud.org:3031/provider/users/${sub}/metadata`,
      { headers: { Authorization: accessToken.token.access_token } },
    );
    const metadata = await responseMetadata.json();
    store.dispatch(setRole(metadata.data.type));
    const responseGroups = await fetch(
      `https://bp.schul-cloud.org:3031/provider/users/${sub}/groups`,
      { headers: { Authorization: accessToken.token.access_token } },
    );
    const groups = await responseGroups.json();
    store.dispatch(setGroup(groups.data.groups[0].name));
    const responseUsers = await fetch(
      `https://bp.schul-cloud.org:3031/provider/groups/${groups.data.groups[0].group_id}`,
      { headers: { Authorization: accessToken.token.access_token } },
    );

    const users = await responseUsers.json();
    store.dispatch(setStudents(users.data.students));
    store.dispatch(setTeachers(users.data.teachers));

    // save to session
    req.session.pseudonym = sub;
    req.session.role = metadata.data.type;
    req.session.group = metadata.data.group;
    req.session.students = users.data.students;
    req.session.teachers = users.data.teachers;
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
  // console.log('finalState', finalState);

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
