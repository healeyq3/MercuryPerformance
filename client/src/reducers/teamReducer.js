import {GET_TEAMS, NEW_TEAM, SET_TEAM} from '../actions/types';

const initialState = {
  teams: {},
  createdTeam: {},
  selectedTeam: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        selectedTeam: "",
        teams: action.payload,
        createdTeam: {},
      };
    case NEW_TEAM:
      return {
        ...state,
        selectedTeam: "",
        createdTeam: action.payload
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
