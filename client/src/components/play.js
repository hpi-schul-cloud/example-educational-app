import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../../../server/config';
import Secure from '../containers/secure';


class Play extends Component {
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
        <p>Dein Name lautet:</p>
        <div dangerouslySetInnerHTML={{ __html: pseudonym }} />
        <p>Deine Rolle: {role}</p>
        <ul>
          <li><Link to="/chapter/1">Kapitel 1</Link></li>
          <li><Link to="/chapter/2">Kapitel 2</Link></li>
          <li><Link to="/chapter/3">Kapitel 3</Link></li>
        </ul>
        <h1>Kurs: {group || '-'}</h1>
        {group &&
        <table>
          <tr><th /><th>Rolle</th><th>Name</th><th>Depseudonymisiert</th></tr>
          {teachers
          .map(teacher => (
              <tr>
                <td>{(pseudonym === teacher.user_id ? <b>Du: </b> : '')}</td>
                <td>Lehrer</td>
                <td><div dangerouslySetInnerHTML={{ __html: teacher.user_id }} /></td>
                <td>-</td>
              </tr>
          ))
          }
          {students
          .map(student => (
              <tr>
                <td>{(pseudonym === student.user_id ? <b>Du: </b> : '')}</td>
                <td>Schüler</td>
                <td>{student.user_id}</td>
                <td><div dangerouslySetInnerHTML={{ __html: student.user_id }} /></td>
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
