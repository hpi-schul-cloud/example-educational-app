import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Header from './components/header';
import Welcome from './containers/welcome';
import Authenticate from './containers/authenticate';
import Play from './containers/play';
import Chapter from './containers/chapter';
import OpenApp from './components/open_app';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Play} />
        <Route exact path="/chapter/:number" component={Chapter} />
        <Route exact path="/launches" component={Welcome} />
        <Route exact path="/auth" component={Authenticate} />
        <Route exact path="/lti-mobile" component={OpenApp} />
      </div>
    );
  }
}

export default App;
