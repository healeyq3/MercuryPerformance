import { GET_BLUEPRINTS, GET_ALL_BLUEPRINTS, NEW_BLUEPRINT, SET_BLUEPRINT, ADD_BLUEPRINT_TEAM, UPDATE_BLUEPRINT, NEW_WORKOUT, GET_WORKOUTS, SET_WORKOUT, WORKOUT_RUNNERS_ADDED, RESET_WORKOUT_RUNNER_ADDED, SEND_ACTUALTIMES, UPDATE_STATISTICS } from './types';
import cookie from 'react-cookies';
import fire from "../Fire";

export function getWorkoutBlueprints(selectedTeamUID){
    return async function(dispatch) {
        fire.auth().onAuthStateChanged(function(user) {
            if(!user){
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/blueprints', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        idToken,
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
            })
        })
    }
}

export function getAllWorkoutBlueprints(){
    return async function(dispatch) {
        fire.auth().onAuthStateChanged(function(user) {
            if (!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/getallblueprints', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        idToken
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
            })
        })
    }
}

export function newWorkoutBlueprint(blueprintData, selectedTeamUID){
    return async function(dispatch) {
        fire.auth().onAuthStateChanged(function(user) {
            if (!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/newblueprint', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        blueprintData,
                        idToken,
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
            })
        })
    }
}

export function updateBlueprint(blueprintData, teamUID){
    return async function(dispatch){
        fire.auth().onAuthStateChanged(function(user) {
            if(!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: '/', sameSite: 'strict', SameSite: 'strict'})
                console.log("Fetch called");
                await fetch('/api/workouts/updateblueprint', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        blueprintData,
                        idToken,
                        selectedTeamUID: teamUID
                    })
                })
                .then(res => res.json())
                .then(blueprint => 
                dispatch({
                    type: UPDATE_BLUEPRINT,
                    payload: blueprint,
                    blueprintUID: blueprint.key
                }))
                .catch(err => {
                    console.log(`error in workoutActions: ${err}`)
                })
            })
        })
    }
}

export function addWorkoutToTeam(blueprintuid, selectedTeamUID){
    return async function(dispatch) {
        fire.auth().onAuthStateChanged(function(user) {
            if (!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/addblueprint', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        blueprintuid,
                        selectedTeamUID,
                        idToken
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
            })
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
        fire.auth().onAuthStateChanged(function(user) {
            if (!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/newworkout', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        workoutData,
                        idToken,
                        selectedTeamUID
                    })
                })
                .then(res => res.json())
                .then(workout => dispatch({
                        type: NEW_WORKOUT,
                        payload: workout,
                        workoutuid: workout.key
                })).catch(err => {
                    console.log(`error in workoutActions: ${err}`)
                })
            })
        })
    }
}

export function getActualWorkouts(selectedTeamUID, blueprint){
    return async function(dispatch){
        fire.auth().onAuthStateChanged(function(user) {
            if (!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

                await fetch('/api/workouts/workouts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        idToken,
                        selectedTeamUID,
                        blueprint
                    })
                })
                    .then(res => res.json())
                    .then(workouts => dispatch({
                        type: GET_WORKOUTS,
                        payload: workouts
                    })).catch(err => {
                        console.log(`error in workoutActions: ${err}`)
                    })
            })
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

export function addRunnersToWorkout(runnerUidArray, workoutuid, date){
    //runnerUidArray is not actually an array
    return async function(dispatch){
      fire.auth().onAuthStateChanged(function(user) {
        user.getIdToken(true).then(async function (idToken) {
            cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });
          await fetch('/api/workouts/addrunner', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              idToken,
              workoutuid,
              date,
              runnerUidArray
            })
          })
          .then(res => res.json())
          .then(runnersAddedObject =>
            dispatch({
              type: WORKOUT_RUNNERS_ADDED,
              payload: runnersAddedObject
            })
          );
        })
      })
    }
  }

export function sendActualTimes(aTimesArray, aETimesArray, workoutStats, workoutuid, runneruid, date, selectedTeam){
    return async function(dispatch){
        fire.auth().onAuthStateChanged(function(user){
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict"});
            await fetch("api/workouts/atimes", {
                method: 'POST',
                headers : {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    idToken,
                    workoutuid,
                    aTimesArray,
                    aETimesArray,
                    workoutStats,
                    date,
                    selectedTeam,
                    runneruid
                })
            })
            .then(res => res.json())
            .then(aTimesObj => 
                dispatch ({
                    type: SEND_ACTUALTIMES,
                    payload: aTimesObj
                })
                );
            })
        })
    }
}

export function updateWorkoutStatistics(workoutuid, statistics){
    return async function(dispatch){
        fire.auth().onAuthStateChanged(function(user){
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict" });
            
            await fetch("api/workouts/statistics", {
                method: 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify({
                    idToken,
                    statistics,
                    workoutuid
                })
            })
            .then(res => res.json())
            .then(statObject => 
                dispatch({
                    type: UPDATE_STATISTICS,
                    payload: statObject
                }))
            })
        })
    }
}

export function resetRunnerAdded(){
    return function(dispatch){
    dispatch({
    type: RESET_WORKOUT_RUNNER_ADDED
    })
}
}

