import {GET_TEAM_EVENTS, NEW_EVENT, SET_EVENT, NEW_TIME} from './types';
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
  export function newTime(timeData, selectedTeamUID, eventUID, runnerUID){
    return async function(dispatch) {
      console.log("Creating new time");
      await fetch('/events/new', {//this may be wrong
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          timeData,
          idToken: cookie.load('idToken'),
          eventUID: eventUID,
          selectedTeamUID: selectedTeamUID,
          runnerUID:runnerUID
        })
      })
        .then(res => res.json())
        .then(time =>
          dispatch({
            type: NEW_TIME,
            payload: time,
            timeUID: time.key
          }))
        .catch((error) => {
          console.log(error);
        })
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
    .then((res) => {
      console.log(res);
    })
    // .then(events =>
    //   dispatch({
    //     type: GET_TEAM_EVENTS,
    //     payload: events
    //   })
    // );
  }
}