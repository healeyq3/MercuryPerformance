import {GET_TEAM_RUNNERS, NEW_RUNNER} from './types';
import cookie from 'react-cookies'

export function getTeamRunners(selectedTeamUID) {
  return async function(dispatch){
    await fetch('/runners', {
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
      .then(runners =>
        dispatch({
          type: GET_TEAM_RUNNERS,
          payload: runners
        })
      );
  }
}

export function newRunner(runnerData, selectedTeamUID){
  return async function(dispatch) {
    await fetch('/runners/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        runnerData,
        idToken: cookie.load('idToken'),
        selectedTeamUID: selectedTeamUID
      })
    })
      .then(res => res.json())
      .then(runner =>
        dispatch({
          type: NEW_RUNNER,
          payload: runner
        })
      ).catch((error) => {
        console.log(error);
      })
  }
}
