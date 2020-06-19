import {GET_BLUEPRINTS, NEW_BLUEPRINT} from '../actions/types';

const initialState = {
    blueprints: {}
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
        default:
            return state;
    }
}