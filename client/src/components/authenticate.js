import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';


class Authenticate extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      window.location = this.props.authorizeUri;
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (<Redirect to="/" />);
    }
    return <p>Leite weiter...</p>;
  }
}

Authenticate.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authorizeUri: PropTypes.string.isRequired,
};

export default Authenticate;
