import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';


class Authenticate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { isAuthenticated, authorizeUri } = this.props;
    if (!isAuthenticated) {
      window.location.href = authorizeUri;
    } else {
      this.setState({ path: localStorage.getItem('redirectTo') || '/' });
      localStorage.removeItem('redirectTo');
    }
  }

  render() {
    if (this.state.path) {
      return (<Redirect to={this.state.path} />);
    }
    return <p>Authentifizieren...</p>;
  }
}

Authenticate.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authorizeUri: PropTypes.string.isRequired,
};

export default Authenticate;
