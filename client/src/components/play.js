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
      teachers,
    } = this.props;

    if (!isAuthenticated) return <Redirect to="/auth" />;

    return (
      <div>
        <h1>Kurs: {group}</h1>
        <table>
          <tr><th /><th>Rolle</th><th>Pseudonym</th><th>Depseudonymisiert</th></tr>
          {teachers
          .map(teacher => (
            <tr>
              <td>{(pseudonym === teacher.user_id ? <b>Du: </b> : '')}</td>
              <td>Lehrer</td>
              <td>{teacher.user_id}</td>
              <td>{Play.renderDepseudo(teacher.user_id)}</td>
            </tr>
          ))
          }
          {students
            .map(student => (
              <tr>
                <td>{(pseudonym === student.user_id ? <b>Du: </b> : '')}</td>
                <td>Schüler</td>
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
