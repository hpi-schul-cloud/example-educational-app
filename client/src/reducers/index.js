import { combineReducers } from 'redux';
import list from './list';
import auth from './auth';

const rootReducer = combineReducers({
  list,
  auth,
});

export default rootReducer;
