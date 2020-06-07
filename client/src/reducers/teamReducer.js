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
        selectedTeam: "",
        teams: action.payload,
      };
    case NEW_TEAM:
      return {
        ...state,
        selectedTeam: "",
        teams: {...state.teams, [action.teamUID]: action.payload}
      };
    case SET_TEAM:
      return {
        ...state,
        selectedTeam: action.payload
      };
    default:
      return state;
  }
}
