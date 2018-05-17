import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const { userId } = this.props.match.params;
    const userNameURL = 'http://localhost:3100/account/username/';
    return (
      <div>
        <p>Hallo {userId}, so kennen wir dich.</p>
        <p>Unpseudonymisiert heißt du wohl: <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}${userId}`} /></p>
        <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}6c4a44bf-e5d4-41ca-80ae-9b68d5cee563`} />
        <p>Viel Spaß beim Lernen!</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Welcome;
