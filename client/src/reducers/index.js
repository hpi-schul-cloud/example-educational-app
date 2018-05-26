import { combineReducers } from 'redux';
import list from './list';
import auth from './auth';
import roster from './roster';

const rootReducer = combineReducers({
  list,
  auth,
  roster,
});

export default rootReducer;
