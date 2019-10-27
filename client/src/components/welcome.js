import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const {
      role,
      pseudonym,
      isEditable,
    } = this.props;

    return (
      <div>
        <p>Hey, pseudonymisierter Mensch</p>
        <p>Wir kennen dich als: {pseudonym}</p>
        <p>Deine Rolle ist {role}!</p>
        {isEditable && <p>Bitte wähle den zu verlinkenden Inhalt aus</p>}
        <h1>Inhalte</h1>
        <ul>
          <li><Link to="/chapter/1">Kapitel 1</Link></li>
          <li><Link to="/chapter/2">Kapitel 2</Link></li>
          <li><Link to="/chapter/3">Kapitel 3</Link></li>
        </ul>
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
