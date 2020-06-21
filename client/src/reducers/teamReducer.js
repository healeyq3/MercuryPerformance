import {GET_TEAMS, NEW_TEAM, SET_TEAM} from '../actions/types';

const initialState = {
  teams: {},
  selectedTeam: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case NEW_TEAM:
      return {
        ...state,
        teams: {...state.teams, [action.teamUID]: action.payload}
      };
    case SET_TEAM:
      console.log("Setting team "+action.payload);
      return {
        ...state,
        selectedTeam: action.payload
      };
    default:
      return state;
  }
}
