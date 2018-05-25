import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import ItemView from './containers/list_item_view';
import Welcome from './containers/welcome';
import Authenticate from './containers/authenticate';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/welcome/:userId" component={Welcome} />
        <Route exact path="/auth" component={Authenticate} />
        <Route exact path="/view/:name" component={ItemView} />
      </div>
    );
  }
}

export default App;
