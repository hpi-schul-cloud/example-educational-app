import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Header from './components/header';
import Welcome from './containers/welcome';
import Authenticate from './containers/authenticate';
import Play from './containers/play';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Play} />
        <Route exact path="/welcome/:userId" component={Welcome} />
        <Route exact path="/auth" component={Authenticate} />
      </div>
    );
  }
}

export default App;
