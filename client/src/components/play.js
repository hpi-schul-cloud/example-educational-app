import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Play extends Component {
  componentDidMount() {

  }
  render() {
    const {
      isAuthenticated,
      role,
      pseudonym,
      students,
      teachers
    } = this.props;

    if (!isAuthenticated) return <Redirect to="/auth" />;

    const userNameURL = 'http://localhost:3100/account/username/';
    return (
      <div>
        <p>Lerne jetzt mit deinem Kurs hier </p>
        <p>Wir kennen dich als: {pseudonym} und du bist {role}</p>
        <p>Unpseudonymisiert heißt du wohl: <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}${pseudonym}`} /></p>
        <p>Ein anderer Schüler heißt <iframe title="username" style={{ height: '26px', width: '180px', border: 'none' }} src={`${userNameURL}6c4a44bf-e5d4-41ca-80ae-9b68d5cee563`} /></p>
        <p>Viel Spaß beim Lernen!</p>
      </div>
    );
  }
}

Play.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
  pseudonym: PropTypes.string,
  students: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
};

Play.defaultProps = {
  role: null,
  pseudonym: null,
};

export default Play;
