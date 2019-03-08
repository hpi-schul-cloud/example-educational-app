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

  constructor() {
    super();
    this.deepLink = this.deepLink.bind(this);
  }

  deepLink() {
    if (this.props.authorizeUri) {
      window.parent.postMessage({
        url: window.location.href,
        windowName: window.name,
      }, '*');
    } else { // LTI 1.3
      const req = this.props.ltiRequest;
      const dls = 'https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings';
      const returnUri = encodeURI(req[dls].deep_link_return_url);
      window.location.href = `/deeplink?return_uri=${returnUri}&
      deployment_id=${req.deployment_id}`;
    }
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
          <button onClick={this.deepLink}>Dieses Kapitel benutzen</button>}
        </div>
      </Secure>
    );
  }
}

Chapter.propTypes = {
  match: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  authorizeUri: PropTypes.string,
  ltiRequest: PropTypes.object,
};

Chapter.defaultProps = {
  authorizeUri: null,
  ltiRequest: null,
};

export default Chapter;
