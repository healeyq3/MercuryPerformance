import { GET_TEAMS, NEW_TEAM } from '../actions/types';

const initialState = {
  teams: [],
  team: {}, 
  counter: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
    // console.log("called")
    // console.log(state)
    // console.log("^")
    // console.log(action.payload)  
    return {
        ...state,
        teams: action.payload,
        counter: + 1
      };
    case NEW_TEAM:
      return {
        ...state,
        team: action.payload
      };
    default:
      return state;
  }
}
