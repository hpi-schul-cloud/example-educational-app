import { ROSTER_ACTIONS } from '../consts/action_types';
import { ROSTER } from '../consts/default_state';

export default (state = ROSTER, action) => {
  switch (action.type) {
    case ROSTER_ACTIONS.SET_ROLE:
      return { ...state, role: action.role };
    case ROSTER_ACTIONS.SET_PSEUDONYM:
      return { ...state, pseudonym: action.pseudonym };
    case ROSTER_ACTIONS.SET_GROUP:
      return { ...state, group: action.group };
    case ROSTER_ACTIONS.SET_STUDENTS:
      return { ...state, students: action.students };
    case ROSTER_ACTIONS.SET_TEACHERS:
      return { ...state, teachers: action.teachers };
    default:
      return state;
  }
};
