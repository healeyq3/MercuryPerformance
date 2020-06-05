import { GET_TEAM_RUNNERS, NEW_RUNNER } from '../actions/types';

const initialState = {
  runners: {},
  createdRunner: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_RUNNERS:
      console.log("Got new runners");
      console.log(action.payload);
      return {
        ...state,
        runners: action.payload
      }
    case NEW_RUNNER:
      return {
        ...state,
        createdRunner: action.payload
      };
    default:
      return state;
  }
}
