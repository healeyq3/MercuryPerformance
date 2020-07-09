import {ADD_BLUEPRINT_TEAM, GET_ALL_BLUEPRINTS, GET_BLUEPRINTS, NEW_BLUEPRINT, UPDATE_BLUEPRINT, SET_BLUEPRINT, NEW_WORKOUT, GET_WORKOUTS, SET_WORKOUT, WORKOUT_RUNNERS_ADDED, RESET_WORKOUT_RUNNER_ADDED, SEND_ACTUALTIMES} from '../actions/types';

const initialState = {
    blueprints: {},
    allBlueprints: {},
    selectedBlueprint: '',
    actualWorkouts: {},
    selectedWorkout: '',
    hasAddedRunner: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_BLUEPRINTS:
            return {
                ...state,
                blueprints: action.payload,
                location: {
                    ...state.location,
                    needsUpdate: false
                }
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
        case UPDATE_BLUEPRINT:
            return {
                ...state,
                blueprints: {...state.blueprints, [action.blueprintUID] : action.payload}
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
        case SET_WORKOUT:
            return {
                ...state,
                selectedWorkout: action.payload
            }
        case WORKOUT_RUNNERS_ADDED:
            const wuid = action.payload.workoutuid;
            const runnersAdded = action.payload.runnersAdded;
            const newState = {
                ...state,
                hasAddedRunner: true
            }
            newState.actualWorkouts[wuid].runners = {
                ...newState.actualWorkouts[wuid].runners,
                ...runnersAdded
            }
            return newState;
        case RESET_WORKOUT_RUNNER_ADDED:
            return {
                ...state,
                hasAddedRunner: false
            }
        case SEND_ACTUALTIMES:
            const awuid = action.payload.workoutuid;
            const ruid = action.payload.runneruid;
            const newState2 = {
                ...state
            }
            newState2.actualWorkouts[awuid].runners[ruid].aTimes = [
                ...action.payload.aTimes
            ]
            return newState2;
        default:
            return state;
    }
}