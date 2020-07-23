import {
    GET_TEAM_DATES
} from '../actions/types';

const initialState = {
    teamWorkoutDates : {},
    teamEventDates : {},
    userWorkoutDates : {},
    userEventDates : {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TEAM_DATES:
            return {
                ...state,
                teamWorkoutDates: action.payload.workoutDates,
                teamEventDates: action.payload.eventDates
            }
        default:
            return state
    }
}