import { GET_BLUEPRINTS, GET_ALL_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT, ADD_BLUEPRINT_TEAM } from './types';
import cookie from 'react-cookies';

export function getWorkoutBlueprints(selectedTeamUID){
    return async function(dispatch) {
        await fetch('/workouts/blueprints', {
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
        console.log("rrr");
        await fetch('/workouts/getallblueprints', {
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
        await fetch('/workouts/newblueprint', {
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
        console.log("Is this even running");
        await fetch('/workouts/addblueprint', {
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