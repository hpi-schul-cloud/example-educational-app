import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Play from './play';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const {
      role,
      pseudonym
    } = this.props;

    return (
      <div>
        <p>Hey, pseudonymisierter Mensch</p>
        <p>Wir kennen dich als: {pseudonym}</p>
        <p>Deine Rolle ist {role}!</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  role: PropTypes.string,
  pseudonym: PropTypes.string,
};

Welcome.defaultProps = {
  role: undefined,
  pseudonym: undefined,
};

export default Welcome;
