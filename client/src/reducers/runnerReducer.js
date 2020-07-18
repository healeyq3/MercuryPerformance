import { GET_TEAM_RUNNERS, NEW_RUNNER, SET_RUNNER, UPDATE_RUNNER, RESET_HOMERUNNER_ADDED } from '../actions/types';

const initialState = {
  runners: {},
  selectedRunner: "",
  hasAddedRunner : false
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
        runners: {...state.runners, [action.runnerUID]: action.payload},
        hasAddedRunner: true
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
    case RESET_HOMERUNNER_ADDED:
      return {
        ...state,
        hasAddedRunner : false
      }
    default:
      return state;
  }
}
