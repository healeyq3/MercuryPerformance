import { GET_TEAM_EVENTS, NEW_EVENT } from '../actions/types';

const initialState = {
  events: {},
  newEvent: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_EVENTS:
      console.log("Got new events");
      console.log(action.payload);
      return {
        ...state,
        events: action.payload
      }
    case NEW_EVENT:
      return {
        ...state,
        newEvent: action.payload
      };
    default:
      return state;
  }
}
