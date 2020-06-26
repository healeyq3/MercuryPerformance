import { GET_BLUEPRINTS, GET_ALL_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT, ADD_BLUEPRINT_TEAM, NEW_WORKOUT, GET_WORKOUTS, SET_WORKOUT } from './types';
import cookie from 'react-cookies';

export function getWorkoutBlueprints(selectedTeamUID){
    return async function(dispatch) {
        await fetch('/api/workouts/blueprints', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                idToken: cookie.load('idToken'),
                selectedTeamUID
            })
        })
        .then(res => res.json())
        .then(
            blueprints =>
            dispatch({
                type: GET_BLUEPRINTS,
                payload: blueprints
            }))
            .catch(err => {
                console.log(`error in workoutActions: ${err}`)
            })
    }
}

export function getAllWorkoutBlueprints(){
    return async function(dispatch) {
        await fetch('/api/workouts/getallblueprints', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                idToken: cookie.load('idToken')
            })
        })
          .then(res => res.json())
          .then(blueprints =>
            dispatch({
                type: GET_ALL_BLUEPRINTS,
                payload: blueprints
            }))
          .catch(err => {
              console.log(`error in workoutActions: ${err}`)
          })
    }
}

export function newWorkoutBlueprint(blueprintData, selectedTeamUID){
    return async function(dispatch) {
        await fetch('/api/workouts/newblueprint', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                blueprintData,
                idToken: cookie.load('idToken'),
                selectedTeamUID
            })
        })
        .then(res => res.json())
        .then(blueprint => 
            dispatch({
                type: NEW_BLUEPRINT,
                payload: blueprint,
                blueprintUID: blueprint.key
            }))
            .catch(err => {
                console.log(`error in workoutActions: ${err}`)
            })
    }
}

export function addWorkoutToTeam(blueprintuid, selectedTeamUID){
    return async function(dispatch) {
        await fetch('/api/workouts/addblueprint', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                blueprintuid,
                selectedTeamUID,
                idToken: cookie.load('idToken')
            })
        })
            .then(res => res.json())
            .then(blueprint =>
                dispatch({
                    type: ADD_BLUEPRINT_TEAM,
                    payload: blueprint
                }))
            .catch(err => {
                console.log(`error in workoutActions: ${err}`)
            })
    }
}

export function setBlueprint(blueprint){
    return function(dispatch){
        dispatch({
            type: SET_BLUEPRINT,
            payload: blueprint
        })
    }
}

export function newActualWorkout(workoutData, selectedTeamUID){
    return async function(dispatch){
        await fetch('/api/workouts/newworkout', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                workoutData,
                idToken: cookie.load('idToken'),
                selectedTeamUID
            })
        })
        .then(res => res.json())
        .then(workout => 
            dispatch({
                type: NEW_WORKOUT,
                payload: workout,
                workoutuid: workout.key
            }))
            .catch(err => {
                console.log(`error in workoutActions: ${err}`)
            })
    }
}

export function getActualWorkouts(selectedTeamUID){
    return async function(dispatch){
        await fetch('/api/workouts/workouts', {
            method: 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                idToken: cookie.load('idToken'),
                selectedTeamUID
            })
        })
        .then(res => res.json())
        .then(workouts => 
            dispatch({
                type: GET_WORKOUTS,
                payload: workouts
            }))
            .catch(err => {
                console.log(`error in workoutActions: ${err}`)
            })
    }
}

export function setWorkout(workout){
    return function(dispatch){
        dispatch({
            type: SET_WORKOUT,
            payload: workout
        })
    }
}