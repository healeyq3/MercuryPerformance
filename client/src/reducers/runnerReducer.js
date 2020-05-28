import { GET_RUNNERS, NEW_RUNNER } from '../actions/types';

const initialState = {
  runners: [],
  runner: {}, 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RUNNERS:
      return {
        ...state,
        runners: action.payload
      };
    case NEW_RUNNER:
      return {
        ...state,
        runners: action.payload
      };
    default:
      return state;
  }
}
