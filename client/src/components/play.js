import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
        <h1>Pseudonymisierung</h1>
        <p>Dein Name lautet:</p>
        <div dangerouslySetInnerHTML={{ __html: pseudonym }} />
        <p>Dein Pseudonym: {pseudonym}</p>
        <p>Deine Rolle: {role}</p>
        <h1>Inhalte</h1>
        <ul>
          <li><Link to="/chapter/1">Kapitel 1</Link></li>
          <li><Link to="/chapter/2">Kapitel 2</Link></li>
          <li><Link to="/chapter/3">Kapitel 3</Link></li>
        </ul>
        <h1>Kurs</h1>
        <p>Der Kursname lautet {group || '-'} und umfasst folgende Benutzer</p>
        {group &&
        <table>
          <tr><th /><th>Rolle</th><th>Name</th></tr>
          {teachers
          .map(teacher => (
            <tr>
              <td>{(pseudonym === teacher.username ? <b>Du: </b> : '')}</td>
              <td>Lehrer</td>
              <td><div dangerouslySetInnerHTML={{ __html: teacher.username }} /></td>
            </tr>
          ))
          }
          {students
          .map(student => (
              <tr>
                <td>{(pseudonym === student.username ? <b>Du: </b> : '')}</td>
                <td>Schüler</td>
                <td><div dangerouslySetInnerHTML={{ __html: student.username }} /></td>
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
