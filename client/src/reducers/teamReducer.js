import {ADD_BLUEPRINT_TEAM, GET_TEAMS, NEW_TEAM, SET_TEAM, UPDATE_TEAM} from '../actions/types';

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

    case ADD_BLUEPRINT_TEAM:
      console.log("do we also run this?")
      return {
        ...state,
        teams: {...state.teams, [action.payload.teamuid]: {
            ...state.teams[action.payload.teamuid],
            blueprints: {
              ...state.teams[action.payload.teamuid].blueprints,
              [action.payload.blueprintuid]: action.payload.blueprintuid
            }
          }
        }
      }
    case UPDATE_TEAM:
    return {
      ...state,
      teams: {...state.teams, [action.teamUID]: action.payload}
    }
    default:
      return state;
  }
}
