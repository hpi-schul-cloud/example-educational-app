import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Play from './play';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const { match } = this.props;

    const { userId } = match.params;
    return (
      <div>
        <p>Hey, pseudonymisierter Mensch</p>
        <p>Wir kennen dich als: {userId}</p>
        <p>Unpseudonymisiert heißt du wohl: {Play.renderDepseudo(userId)}</p>
        <p>Ein fremder Schüler heißt {Play.renderDepseudo('6c4a44bf-e5d4-41ca-80ae-9b68d5cee563')}</p>
        <p>Viel Spaß beim Lernen!</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Welcome;
