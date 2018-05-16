import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Welcome extends Component {
  componentDidMount() {

  }
  render() {
    const { userId } = this.props.match.params;
    return (
      <div>
        <p>Hallo {userId}</p>
        <p>Viel Spaß beim Lernen!</p>
      </div>
    );
  }
}

Welcome.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Welcome;
