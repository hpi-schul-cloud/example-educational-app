import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Secure from '../containers/secure';

class Chapter extends Component {
  static getText(chapter) {
    switch (chapter) {
      case '1':
        return 'Geschichte ist ein tolles Fach.';
      case '2':
        return 'Napoleon hat Frankreich geruled.';
      case '3':
        return 'Hitler wurde fast umgebracht bei einem Attentat.';
      default:
        return 'Kapitel nicht vorhanden.';
    }
  }

  static sendUrl() {
    window.parent.postMessage({
      url: window.location.href,
      windowName: window.name,
    }, '*');
  }

  render() {
    const {
      match,
      isEditable,
    } = this.props;

    const { number } = match.params;

    return (
      <Secure>
        <div>
          <Link to="/">Home</Link>
          <h1>Kapitel {number}</h1>
          <p>{Chapter.getText(number)}</p>
          {isEditable &&
          <button onClick={Chapter.sendUrl}>Dieses Kapitel im Arbeitsblatt
            benutzen
          </button>}
        </div>
      </Secure>
    );
  }
}

Chapter.propTypes = {
  match: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

export default Chapter;
