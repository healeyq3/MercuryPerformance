import {
  GET_TEAM_EVENTS,
  NEW_EVENT,
  SET_EVENT,
  NEW_TIME,
  RUNNERS_ADDED,
  SELECT_RUNNER,
  RESET_RUNNER_ADDED
} from './types';
import cookie from 'react-cookies'
import fire from "../Fire";

export function newEvent(eventData, selectedTeamUID){
  return async function(dispatch) {
    fire.auth().onAuthStateChanged(function(user){
      user.getIdToken(true).then(async function(idToken){
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/events/new', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            eventData,
            idToken,
            selectedTeamUID
          })
        })
        .then(res => res.json())
        .then(event =>
          dispatch({
            type: NEW_EVENT,
            payload: event,
            eventUID: event.key
          }))
        .catch((error) => {
          console.log(error);
        })
      })
    })
  }
}

export function newTime(timeData, splitsData, analysisData, selectedTeamUID, eventUID, runnerUID){
  return async function(dispatch) {
    fire.auth().onAuthStateChanged(function(user) {
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/events/newtime', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            timeData,
            splitsData,
            analysisData,
            idToken,
            eventUID,
            selectedTeamUID,
            runnerUID
          })
        })
        .then((res) => res.json())
        .then((forPayload) => {
          dispatch({
            type: NEW_TIME,
            payload: forPayload
          })
        })
      })
    })
  }
}

export function getTeamEvents(selectedTeamUID) {
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/events', {
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
        .then(events =>
          dispatch({
            type: GET_TEAM_EVENTS,
            payload: events
          })
        );
      })
    })
  }
}

export function setEvent(event){
  return function(dispatch){
    dispatch({
      type: SET_EVENT,
      payload: event
    })
  }
}

export function addRunnersToEvent(runnerUidArray, eventuid){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });
        await fetch('/api/events/addrunner', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            idToken,
            eventuid,
            runnerUidArray
          })
        })
        .then(res => res.json())
        .then(runnersAddedObject =>
          dispatch({
            type: RUNNERS_ADDED,
            payload: runnersAddedObject
          }))
      })
    })
  }
}

export function selectRunner(selectedRunnerUID){
  return function(dispatch){
    dispatch({
      type: SELECT_RUNNER,
      payload: selectedRunnerUID
    })
  }
}

export function resetRunnerAdded(){
  return function(dispatch){
    dispatch({
      type: RESET_RUNNER_ADDED
    })
  }
}