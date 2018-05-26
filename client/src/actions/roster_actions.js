import { ROSTER_ACTIONS } from '../consts/action_types';

export const setRole = role => ({
  type: ROSTER_ACTIONS.SET_ROLE,
  role,
});

export const setPseudonym = pseudonym => ({
  type: ROSTER_ACTIONS.SET_PSEUDONYM,
  pseudonym,
});

export const setGroup = group => ({
  type: ROSTER_ACTIONS.SET_GROUP,
  group,
});

export const setStudents = students => ({
  type: ROSTER_ACTIONS.SET_STUDENTS,
  students,
});

export const setTeachers = teachers => ({
  type: ROSTER_ACTIONS.SET_TEACHERS,
  teachers,
});