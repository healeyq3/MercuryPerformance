import { GET_TEAM_RUNNERS, NEW_RUNNER, SET_RUNNER, UPDATE_RUNNER } from '../actions/types';

const initialState = {
  runners: {},
  selectedRunner: "",
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
        runners: {...state.runners, [action.runnerUID]: action.payload}
      };
    case SET_RUNNER:
      return {
        ...state,
        selectedRunner: action.payload
      }
    case UPDATE_RUNNER:
      return {
        ...state,
        runners: {...state.runners, [action.runnerUID]: action.payload}
      }
    default:
      return state;
  }
}
