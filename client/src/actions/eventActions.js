import {
  GET_TEAM_EVENTS,
  NEW_EVENT,
  SET_EVENT,
  NEW_TIME,
  RUNNERS_ADDED,
  SELECT_RUNNER,
  RESET_RUNNER_ADDED,
  REFRESH_EVENT,
  NEW_EVENT_HOLDER,
  SET_EVENT_HOLDER,
  GET_EVENT_HOLDERS,
  GET_HOLDER_EVENTS
} from './types';
import cookie from 'react-cookies'
import fire from "../Fire";

export function newEventHolder(eventData, selectedTeamUID){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user){
      user.getIdToken(true).then(async function (idToken){
        cookie.save('mercury-fb-token', idToken, { path : "/", sameSite : "strict", SameSite: "strict" });

        await fetch('/api/events/newholder', {
          method: 'POST',
          headers : {
            'content-type' : 'application/json'
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
            type : NEW_EVENT_HOLDER,
            payload: event,
            eventUID: event.key
          }))
          .catch(err => {
            console.log("Error creating the event holder")
            console.log(err);
          })
      })
    })
  }
}

export function newEvent(eventData, selectedTeamUID, selectedHolder){
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
            selectedTeamUID,
            selectedHolder
          })
        })
        .then(res => res.json())
        .then(event =>
          dispatch({
            type: NEW_EVENT,
            payload: event,
            eventUID: event.key,
            holderUID: event.holder
          }))
        .catch((error) => {
          console.log(error);
        })
      })
    })
  }
}

export function newTime(timeData, splitsData, analysisData, selectedTeamUID, eventUID, runnerUID, date){
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
            runnerUID,
            date
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

export function getEventHolders(selectedTeamUID){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user){
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: '/', sameSite: "strict", SameSite: "strict" });

        await fetch('/api/events/getholders', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            idToken,
            selectedTeamUID
          })
        })
        .then(res => res.json())
        .then(eventHolders => 
          dispatch({
            type: GET_EVENT_HOLDERS,
            payload: eventHolders
          }))
      })
    })
  }
}

export function getHolderEvents(holderUID){
  console.log("Got into function")
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user){
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: '/', sameSite: "strict", SameSite: "strict" });

        await fetch('/api/events/getholderevents', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            idToken,
            holderUID
          })
        })
        .then(res => res.json())
        .then(events => 
          dispatch({
            type: GET_HOLDER_EVENTS,
            payload: events
          }))
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

export function setEventHolder(eventHolder){
  return function(dispatch){
    dispatch({
      type : SET_EVENT_HOLDER,
      payload: eventHolder
    })
  }
}

export function addRunnersToEvent(runnerUidArray, eventuid, date){
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
            date,
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

export function refreshEvent(eventuid){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user){
      if(!user){
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict" });

        await fetch('/api/events/refreshevent', {
          method: 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            idToken,
            eventuid
          })
        })
        .then(res => res.json())
        .then(event => dispatch({
          type: REFRESH_EVENT,
          payload: event,
          eventUID: event.key
        }))
        .catch(err => {
          console.log(err);
        })
      })
    })
  }
}