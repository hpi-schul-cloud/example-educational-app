import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import ItemView from './containers/list_item_view';
import Welcome from './components/welcome';

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/welcome/:userId" component={Welcome} />
    <Route exact path="/view/:name" component={ItemView} />
  </div>
);

export default App;
