import {GET_RUNNERS, NEW_RUNNER} from './types';
import cookie from 'react-cookies'

export function getRunners() {
  return async function(dispatch){
    await fetch('/teams/', {//need to add selected team
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
          type: GET_RUNNERS,
          payload: runners
        })
      );
  }
}

export function newRunner(runnerData){
  return async function(dispatch) {
    await fetch('/teams/new', {//need to add to selected team
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        runnerData,
        idToken: cookie.load('idToken')
      })
    })
      .then(res => res.json())
      .then(team =>
        dispatch({
          type: NEW_RUNNER,
          payload: runner
        })
      ).catch((error) => {
        console.log(error);
      })
  }
}
