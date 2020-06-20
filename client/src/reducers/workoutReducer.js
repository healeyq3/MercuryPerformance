import {GET_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT} from '../actions/types';

const initialState = {
    blueprints: {},
    selectedBlueprint: ''
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_BLUEPRINTS:
            return {
                ...state,
                blueprints: action.payload
            }
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