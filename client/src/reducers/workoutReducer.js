import {GET_ALL_BLUEPRINTS, GET_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT} from '../actions/types';

const initialState = {
    blueprints: {},
    allBlueprints: {},
    selectedBlueprint: ''
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_BLUEPRINTS:
            return {
                ...state,
                blueprints: action.payload
            }
        case GET_ALL_BLUEPRINTS:
            return {
                ...state,
                allBlueprints: action.payload
            }
            break;
        case NEW_BLUEPRINT:
            return {
                ...state,
                blueprints: {...state.blueprints, [action.blueprintUID]: action.payload}
            }
        case SET_BLUEPRINT:
            return {
                ...state,
                selectedBlueprint: action.payload
            }
        default:
            return state;
    }
}