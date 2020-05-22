import { GET_TEAMS, NEW_TEAM } from '../actions/types';

const initialState = {
  teams: [],
  team: {}, 
  counter: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload
      };
    case NEW_TEAM:
      return {
        ...state,
        teams: action.payload
      };
    default:
      return state;
  }
}
