import { combineReducers } from 'redux';
import teamReducer from './teamReducer';
import runnerReducer from './runnerReducer';
import eventReducer from './eventReducer';
import workoutReducer from './workoutReducer';
import calendarReducer from './calendarReducer';

export default combineReducers({
  teams: teamReducer,
  runners: runnerReducer,
  events: eventReducer,
  workouts: workoutReducer,
  calendar: calendarReducer
});
