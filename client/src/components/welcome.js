import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const { isAuthenticated, match } = this.props;

    // if (!isAuthenticated) return <Redirect to="/auth" />;

    const { userId } = match.params;
    const userNameURL = 'http://localhost:3100/account/username/';
    return (
      <div>
        <p>Hey, pseudonymisierter Mensch</p>
        <p>Wir kennen dich als: {userId}</p>
        <p>Unpseudonymisiert heißt du wohl: <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}${userId}`} /></p>
        <p>Ein anderer Schüler heißt <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}6c4a44bf-e5d4-41ca-80ae-9b68d5cee563`} /></p>
        <p>Viel Spaß beim Lernen!</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  match: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Welcome;
