import {ADD_BLUEPRINT_TEAM, GET_ALL_BLUEPRINTS, GET_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT, NEW_WORKOUT, GET_WORKOUTS} from '../actions/types';

const initialState = {
    blueprints: {},
    allBlueprints: {},
    selectedBlueprint: '',
    actualWorkouts: {},
    selectedWorkout: ''
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
        case ADD_BLUEPRINT_TEAM:
            return {
                ...state,
                blueprints: {
                    ...state.blueprints,
                    [action.payload.blueprintuid]: state.allBlueprints[action.payload.blueprintuid]
                }
            }
        case NEW_WORKOUT:
            return {
                ...state,
                actualWorkouts: {...state.actualWorkouts, [action.workoutuid] : action.payload}
            }
        case GET_WORKOUTS:
            return {
                ...state,
                actualWorkouts: action.payload
            }
        default:
            return state;
    }
}