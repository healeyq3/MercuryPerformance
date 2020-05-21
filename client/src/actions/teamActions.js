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
    console.log(teamData);
    console.log(teamData.user);
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
