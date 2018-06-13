import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../../server/config';
import Secure from '../containers/secure';


class Play extends Component {
  static renderDepseudo(pseudonym) {
    return (
      <iframe
        title="username"
        style={{ height: '26px', width: '180px', border: 'none' }}
        src={`${config.userNameURL}${pseudonym}`}
      />
    );
  }

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
        <p>Dein Pseudonym: {pseudonym}</p>
        <p>Depseudo: {Play.renderDepseudo(pseudonym)}</p>
        <p>Deine Rolle: {role}</p>
        <ul>
          <li><Link to="/chapter/1">Kapitel 1</Link></li>
          <li><Link to="/chapter/2">Kapitel 2</Link></li>
          <li><Link to="/chapter/3">Kapitel 3</Link></li>
        </ul>
        <h1>Kurs: {group || '-'}</h1>
        {group &&
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
        </table>}
      </Secure>
    );
  }
}

Play.propTypes = {
  role: PropTypes.string,
  pseudonym: PropTypes.string,
  group: PropTypes.string,
  students: PropTypes.array,
  teachers: PropTypes.array,
};

Play.defaultProps = {
  role: undefined,
  pseudonym: undefined,
  group: undefined,
  students: undefined,
  teachers: undefined,
};

export default Play;
