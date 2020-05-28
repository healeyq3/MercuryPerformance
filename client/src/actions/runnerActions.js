import {GET_RUNNERS, NEW_RUNNER} from './types';
import cookie from 'react-cookies'

export function getRunners(selectedTeamUID) {
  return async function(dispatch){
    await fetch('/runners', {//need to add selected team
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
          type: GET_RUNNERS,
          payload: runners
        })
      );
  }
}

export function newRunner(runnerData, selectedTeamUID){
  return async function(dispatch) {
    await fetch('/runners/new', {//need to add to selected team
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        runnerData,
        idToken: cookie.load('idToken'),
        selectedTeamUID
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
