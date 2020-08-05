import {
  GET_TEAM_EVENTS,
  NEW_EVENT,
  SET_EVENT,
  NEW_TIME,
  RUNNERS_ADDED,
  SELECT_RUNNER,
  RESET_RUNNER_ADDED,
  REFRESH_EVENT,
  NEW_EVENT_HOLDER,
  SET_EVENT_HOLDER,
  GET_EVENT_HOLDERS,
  GET_HOLDER_EVENTS
} from '../actions/types';

const initialState = {
  teamEvents: {},
  eventHolders: {},
  holderEvents: {},
  selectedEvent: '',
  selectedRunner: '',
  hasAddedRunner: false,
  selectedEventHolder: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case GET_EVENT_HOLDERS:
      return {
        ...state,
        eventHolders: action.payload
      }
    case GET_HOLDER_EVENTS:
      return {
        ...state,
        holderEvents: action.payload
      }
    case NEW_EVENT:
      return {
        ...state,
        events: {...state.events, [action.eventUID]: action.payload},
        holderEvents: {...state.holderEvents, [action.holderUID]: action.payload}
      };
    case SET_EVENT:
      return {
        ...state,
        selectedEvent: action.payload
      }
    case SET_EVENT_HOLDER:
      return {
        ...state,
        selectedEventHolder: action.payload
      }
    case NEW_TIME:
      const eventuid = action.payload.eventUID;
      const runneruid = action.payload.runnerUID;
      const timeData = action.payload.timeData;
      const splitsArray = action.payload.splitsArray;
      console.log("timeData:")
      console.log(timeData);
      console.log('splitData');
      console.log(splitsArray);
      const newerState = {
        ...state
      }

      newerState.events[eventuid].runners[runneruid].time = {
        ...newerState.events[eventuid].runners[runneruid].time,
        ...timeData
      } 
      newerState.events[eventuid].runners[runneruid].splits = {
        ...newerState.events[eventuid].runners[runneruid].splits,
        ...splitsArray
      }
      newerState.events[eventuid].runners[runneruid].raceV02 = action.payload.raceV02
      newerState.events[eventuid].runners[runneruid].raceWPace = action.payload.raceWPace
      return newerState;
    case RUNNERS_ADDED:
      const euid = action.payload.eventuid;
      const runnersAdded = action.payload.runnersAdded;
      const newState = {
        ...state,
        hasAddedRunner: true
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
    case RESET_RUNNER_ADDED:
      return{
        ...state,
        hasAddedRunner: false
      }
    case REFRESH_EVENT:
      return {
        ...state,
        events : {...state.events, [action.eventUID] : action.payload}
      }
    case NEW_EVENT_HOLDER:
      return {
        ...state,
        eventHolders: {...state.eventHolders, [action.eventUID]: action.payload}
      }
    default:
      return state;
  }
}
