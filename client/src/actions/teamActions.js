import { GET_TEAMS } from './types';
import cookie from 'react-cookies'

export function getTeams() {
  return async function(dispatch){
    await fetch('/teams', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        idToken: cookie.load('idToken')
      })
    })
      .then(res => res.json())
      .then(teams =>
        dispatch({
          type: GET_TEAMS,
          payload: teams
        })
      );
  }
}

export function newTeam(teamData){
  return function(dispatch) {
    fetch('/teams/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        teamData,
        idToken: cookie.load('idToken')
      })
    })
      .then(res => res.json())
      .then(teams =>
        dispatch({
          type: GET_TEAMS,
          payload: teams
        })
      ).catch((error) => {
        console.log(error);
      })
  }
}
