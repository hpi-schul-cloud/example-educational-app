import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import oauth2 from 'simple-oauth2';
import Router from 'express-promise-router';
import fetch from 'isomorphic-fetch',
import reducers from '../../client/src/reducers/index';
import { setAuthorizeUri, setIsAuthenticated } from '../../client/src/actions/auth_actions';
import { addItem } from '../../client/src/actions/list_actions';
import App from '../../client/src/app';
import config from '../config';


const router = new Router();

router.get('/', async (req, res) => {
  let accessToken = null;

  /*
    http://redux.js.org/docs/recipes/ServerRendering.html
  */
  const store = createStore(reducers);

  /*
      We can dispatch actions from server side as well. This can be very useful if you want
      to inject some initial data into the app. For example, if you have some articles that
      you have fetched from database and you want to load immediately after the user has loaded
      the webpage, you can do so in here.

      Here we are inject an list item into our app. Normally once the user has loaded the webpage
      we would make a request to the server and get the latest item list. But in the server we have
      instant connection to a database (for example, if you have a mongoDB or MySQL database
      installed in the server which contains all you items).
      So you can quickly fetch and inject it into the webpage.

      This will help SEO as well. If you load the webpage and make a request to the server to get
      all the latest items/articles, by the time Google Search Engine may not see all the updated
      items/articles.

      But if you inject the latest items/articles before it reaches the user, the Search Engine
      will see the item/article immediately.
       */
  store.dispatch(addItem({
    name: 'middleware',
    description: `Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.
    It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.`,
  }));

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
      store.dispatch(setIsAuthenticated(true));
      accessToken = oauth.accessToken.create(result);
    } catch (ex) {
      console.log('Access Token Error: ', ex);
    }
  }

  console.log(accessToken);
  if (accessToken) {
    // TODO: get classes
    // console.log(accessToken.token.access_token);
    // const metadata = await fetch('http://bp.schul-cloud.org:3031/provider/users/4b81c9b2-7c8c-4255-83f1-268e4d83d71b/metadata');
    // console.log(metadata);
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
