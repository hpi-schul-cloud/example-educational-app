import { combineReducers } from 'redux';
import auth from './auth';
import roster from './roster';

const rootReducer = combineReducers({
  auth,
  roster,
});

export default rootReducer;
