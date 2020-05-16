import { GET_TEAMS, NEW_TEAM } from './types';
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
};

export const newTeam = teamData => dispatch => {
  fetch('/createTeam', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      teamData,
      idToken: document.idToken
    })
  })
    .then(res => res.json())
    .then(team =>
      dispatch({
        type: NEW_TEAM,
        payload: team
      })
    );
};
