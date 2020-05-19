import { GET_TEAMS } from './types';
import cookie from 'react-cookies'

export function getTeams() {
  return function(dispatch){
    fetch('/teams', {
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
    console.log("team action newTeam called");
    fetch('/createTeam', {
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
      );
  }
}
