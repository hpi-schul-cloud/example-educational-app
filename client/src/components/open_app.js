import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Secure from '../containers/secure';


class OpenApp extends Component {
  render() {
    const {
      role,
      pseudonym,
      group,
      students,
      teachers,
    } = this.props;

    return (
      <Secure>
        <div>
          <a target="_parent" href="https://4ac386aa.ngrok.io" className="button">GO TO APP</a>
        </div>
      </Secure>
    );
  }
}

OpenApp.propTypes = {
  role: PropTypes.string,
  pseudonym: PropTypes.string,
  group: PropTypes.string,
  students: PropTypes.array,
  teachers: PropTypes.array,
};

OpenApp.defaultProps = {
  role: undefined,
  pseudonym: undefined,
  group: undefined,
  students: undefined,
  teachers: undefined,
};

export default OpenApp;
