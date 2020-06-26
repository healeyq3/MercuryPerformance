import {GET_TEAM_RUNNERS, NEW_RUNNER, SET_RUNNER, UPDATE_RUNNER} from './types';
import cookie from 'react-cookies'
import fire from "../Fire";

export function getTeamRunners(selectedTeamUID) {
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/runners', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            idToken,
            selectedTeamUID
          })
        }).then(res => res.json()).then(runners =>
            dispatch({
              type: GET_TEAM_RUNNERS,
              payload: runners
            })
        );
      })
    })
  }
}

export function newRunner(runnerData, selectedTeamUID){
  return async function(dispatch) {
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/runners/new', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            runnerData,
            idToken,
            selectedTeamUID
          })
        }).then(res => res.json()).then(runner =>
            dispatch({
              type: NEW_RUNNER,
              payload: runner,
              runnerUID: runner.key
            })
        ).catch((error) => {
          console.log(error);
        })
      })
    })
  }
}

export function setRunner(runner){
  return function(dispatch){
    dispatch({
      type: SET_RUNNER,
      payload: runner
    })
  }
}

export function updateRunner(runnerUID, toUpdate, newValue){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/runners/update', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            idToken,
            runnerUID,
            toUpdate,
            newValue
          })
        })
        .then(res => res.json())
        .then(runner =>
            dispatch({
              type: UPDATE_RUNNER,
              payload: runner,
              runnerUID: runner.key
            })
        ).catch((err) => {
          console.log(err)
        })
      })
    })
  }
}
