import {GET_TEAM_EVENTS, NEW_EVENT, SET_EVENT, NEW_TIME, RUNNERS_ADDED} from '../actions/types';

const initialState = {
  events: {},
  selectedEvent: '',
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
      return{
        ...state,
        times: {...state.times, [action.eventUID]: action.payload}//this is wrong
      }
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
    default:
      return state;
  }
}
