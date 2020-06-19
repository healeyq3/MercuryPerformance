import { GET_BLUEPRINTS, NEW_BLUEPRINT } from './types';
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
        .then(blueprints =>
            dispatch({
                type: GET_BLUEPRINTS,
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