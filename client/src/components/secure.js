import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Authenticate from '../containers/authenticate';

export default class Secure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathIsStored: false,
    };
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      localStorage.setItem('redirectTo', window.location.pathname);
      this.setState({ pathIsStored: true });
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return this.props.children;
    }
    if (this.state.pathIsStored) {
      return <Authenticate />;
    }
    return <p>Authentifizieren...</p>;
  }
}

Secure.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
