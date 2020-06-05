import {GET_TEAM_EVENTS, NEW_EVENT} from './types';
import cookie from 'react-cookies'

export function newEvents(eventData, selectedTeamUID){
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
            payload: event
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
        teamUID: selectedTeamUID
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