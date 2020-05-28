import { combineReducers } from 'redux';
import teamReducer from './teamReducer';
import runnerReducer from './runnerReducer';

export default combineReducers({
  teams: teamReducer,
  runners: runnerReducer
});
