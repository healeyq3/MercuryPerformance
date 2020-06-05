import { combineReducers } from 'redux';
import teamReducer from './teamReducer';
import runnerReducer from './runnerReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  teams: teamReducer,
  runners: runnerReducer,
  events: eventReducer
});
