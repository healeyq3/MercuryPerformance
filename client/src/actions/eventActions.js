import {GET_TEAM_EVENTS, NEW_EVENT, SET_EVENT, NEW_TIME, RUNNERS_ADDED, SELECT_RUNNER} from './types';
import cookie from 'react-cookies'

export function newEvent(eventData, selectedTeamUID){
  return async function(dispatch) {
    console.log("Creating new event");
    await fetch('/events/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        eventData,
        idToken: cookie.load('idToken'),
        selectedTeamUID: selectedTeamUID
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
  }
}

export function newTime(timeData, selectedTeamUID, eventUID, runnerUID){//This runs to completion
  console.log("TeamUID: "+selectedTeamUID);
  return async function(dispatch) {
    console.log("Creating new time");
    await fetch('/events/newtime', {//this is not actually going to the events backend, even though the link should be correct
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        timeData,
        idToken: cookie.load('idToken'),
        eventUID: eventUID,
        selectedTeamUID: selectedTeamUID,
        runnerUID: runnerUID
      })
    }).then((res) => res.json())
      .then((forPayload) => {
      dispatch({
        type: NEW_TIME,
        payload: forPayload
      })})
  }
}

export function getTeamEvents(selectedTeamUID) {
  return async function(dispatch){
    await fetch('/events', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        idToken: cookie.load('idToken'),
        selectedTeamUID: selectedTeamUID
      })
    })
    .then(res => res.json())
    .then(events =>
      dispatch({
        type: GET_TEAM_EVENTS,
        payload: events
      })
    );
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
    await fetch('/events/addrunner', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        idToken: cookie.load('idToken'),
        eventuid: eventuid,
        runnerUidArray: runnerUidArray
      })
    })
    .then(res => res.json())
    .then(runnersAddedObject =>
      dispatch({
        type: RUNNERS_ADDED,
        payload: runnersAddedObject
      })
    );
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