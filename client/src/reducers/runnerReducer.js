import { NEW_RUNNER } from '../actions/types';

const initialState = {
  newRunner: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_RUNNER:
      return {
        ...state,
        newRunner: action.payload
      };
    default:
      return state;
  }
}
