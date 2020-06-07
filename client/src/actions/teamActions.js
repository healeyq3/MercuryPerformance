import {GET_TEAMS, NEW_TEAM, SET_TEAM} from './types';
import cookie from 'react-cookies'

export function getTeams() {
  return async function(dispatch){
    await fetch('/teams', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        idToken: cookie.load('idToken'),
      })
    })
      .then(res => res.json())
      .then(teams => dispatch({
        type: GET_TEAMS,
        payload: teams
      })
    );
  }
}

export function newTeam(teamData){
  return async function(dispatch) {
    await fetch('/teams/new', {
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
      .then(createdTeam => dispatch({
          type: NEW_TEAM,
          payload: createdTeam,
          teamUID: createdTeam.key
        })
      ).catch((error) => {
        console.log(error);
      })
  }
}

export function setTeam(team){
  return function(dispatch){
    dispatch({
      type: SET_TEAM,
      payload: team
    })
  }
}