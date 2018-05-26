import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const userNameURL = 'https://bp.schul-cloud.org/account/username/';

class Play extends Component {
  static renderDepseudo(pseudonym) {
    return (
      <iframe
        title="username"
        style={{ height: '26px', width: '180px', border: 'none' }}
        src={`${userNameURL}${pseudonym}`}
      />
    );
  }

  render() {
    const {
      isAuthenticated,
      role,
      pseudonym,
      group,
      students,
      teachers
    } = this.props;

    if (!isAuthenticated) return <Redirect to="/auth" />;

    return (
      <div>
        <h1>Du</h1>
        <table>
          <tr><th>Pseudonym</th><th>Depseudonymisiert</th></tr>
          <tr>
            <td>{pseudonym}</td>
            <td>{Play.renderDepseudo(pseudonym)}</td>
          </tr>
        </table>
        <h1>{(role === 'teacher' ? 'Lernende' : 'Mitlernende')}</h1>
        <table>
          <tr><th>Pseudonym</th><th>Depseudonymisiert</th></tr>
          {students
            .filter(student => student.user_id !== pseudonym)
            .map(student => (
              <tr>
                <td>{student.user_id}</td>
                <td>{Play.renderDepseudo(student.user_id)}</td>
              </tr>
            ))
          }
        </table>
      </div>
    );
  }
}

Play.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
  pseudonym: PropTypes.string,
  group: PropTypes.string,
  students: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
};

Play.defaultProps = {
  role: null,
  pseudonym: null,
  group: null,
};

export default Play;
