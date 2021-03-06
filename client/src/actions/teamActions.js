import {GET_TEAMS, NEW_TEAM, SET_TEAM, UPDATE_TEAM, REFRESH_TEAM} from './types';
import cookie from 'react-cookies'
import fire from "../Fire";

export function getTeams() {
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/teams', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            idToken
          })
        }).then(res => res.json()).then(teams => dispatch({
              type: GET_TEAMS,
              payload: teams
            })
        );
      })
    })
  }
}

export function newTeam(teamData){
  return async function(dispatch) {
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/teams/new', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            teamData,
            idToken
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
      })
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

export function updateTeam(teamUID, toUpdate, newValue){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      if (!user) {
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

        await fetch('/api/teams/update', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            idToken,
            teamUID,
            toUpdate,
            newValue
          })
        })
        .then(res => res.json())
        .then(team => dispatch({
          type: UPDATE_TEAM,
          payload: team,
          teamUID: team.key
        })).catch((err) => {
          console.log(err)
        })
      })
    })
  }
}

export function updateV02(teamUID, date){
  return async function(dispatch){
    fire.auth().onAuthStateChanged(function(user) {
      if(!user){
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict" });

        await fetch('/api/teams/updateV02', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            idToken,
            teamUID,
            date
          })
        })
        .then(res => res.json())
        .then(team => dispatch({
          type: UPDATE_TEAM,
          payload: team,
          teamUID: team.key
        })).catch(err => {
          console.log(err);
        })
      })
    })
  }
}

export function refreshTeam(teamUID){
  console.log("Got into the function")
  return async function(dispatch){
    console.log("Got into the return function");
    fire.auth().onAuthStateChanged(function(user){
      if(!user){
        cookie.remove('mercury-fb-token');
        return;
      }
      user.getIdToken(true).then(async function (idToken) {
        cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict" });
        console.log("Got to before the fetch")
        await fetch('api/teams/refreshteam', {
          method: 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            idToken,
            teamUID
          })
        }).then(res => res.json()).then(team => dispatch({
          type: REFRESH_TEAM,
          payload: team,
          teamuid: team.key
        }))
        .catch(err => {
          console.log("Error refreshing");
          console.log(err);
        })
      })
    })
  }
}