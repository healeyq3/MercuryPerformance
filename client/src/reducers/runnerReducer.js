import { GET_TEAM_RUNNERS, NEW_RUNNER } from '../actions/types';

const initialState = {
  runners: {},
  newRunner: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_RUNNERS:
      return {
        ...state,
        runners: action.payload
      }
    case NEW_RUNNER:
      return {
        ...state,
        newRunner: action.payload
      };
    default:
      return state;
  }
}
