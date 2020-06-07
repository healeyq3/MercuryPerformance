import {GET_TEAM_EVENTS, NEW_EVENT, SET_EVENT} from './types';
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
          })
        ).catch((error) => {
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