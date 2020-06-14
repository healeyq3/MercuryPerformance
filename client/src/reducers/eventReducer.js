import {GET_TEAM_EVENTS, NEW_EVENT, SET_EVENT, NEW_TIME, RUNNERS_ADDED, SELECT_RUNNER} from '../actions/types';

const initialState = {
  events: {},
  selectedEvent: '',
  selectedRunner: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case NEW_EVENT:
      return {
        ...state,
        events: {...state.events, [action.eventUID]: action.payload}
      };
    case SET_EVENT:
      return {
        ...state,
        selectedEvent: action.payload
      }
    case NEW_TIME:
      const eventuid = action.payload.eventUID;
      const runneruid = action.payload.runnerUID;
      const timeData = action.payload.timeData;
      const newerState = {
        ...state
      }
      console.log('runners: ' + newerState.events[eventuid].runners);
      newerState.events[eventuid].runners[runneruid].times = {
        ...newerState.events[eventuid].runners[runneruid].times,
        ...timeData
      }
      return newerState;
    case RUNNERS_ADDED:
      const euid = action.payload.eventuid;
      const runnersAdded = action.payload.runnersAdded;
      const newState = {
        ...state,
      }
      newState.events[euid].runners = {
        ...newState.events[euid].runners,
        ...runnersAdded
      }
      return newState;
    case SELECT_RUNNER:
      return{
        ...state,
        selectedRunner: action.payload
      }
    default:
      return state;
  }
}
