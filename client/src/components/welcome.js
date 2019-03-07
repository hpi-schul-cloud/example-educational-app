import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Play from './play';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const {
      role,
      pseudonym,
      isEditable
    } = this.props;

    return (
      <div>
        <p>Hey, pseudonymisierter Mensch</p>
        <p>Wir kennen dich als: {pseudonym}</p>
        <p>Deine Rolle ist {role}!</p>
        {isEditable && <p>Bitte wähle den zu verlinkenden Inhalt aus</p>}
      </div>
    );
  }
}

Welcome.propTypes = {
  role: PropTypes.string,
  pseudonym: PropTypes.string,
  isEditable: PropTypes.bool,
};

Welcome.defaultProps = {
  role: undefined,
  pseudonym: undefined,
  isEditable: false,
};

export default Welcome;
