import {
    GET_TEAM_DATES
} from './types';
import cookie from 'react-cookies'
import fire from '../Fire';

export function getTeamDates(teamuid){
    console.log("Got into calendar actions")
    return async function(dispatch){
        fire.auth().onAuthStateChanged(function(user) {
            if(!user) {
                cookie.remove('mercury-fb-token');
                return;
            }
            user.getIdToken(true).then(async function (idToken) {
                cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite: "strict" });

                console.log("Before fetch")
                await fetch("/api/calendar", {
                    method: "POST",
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        idToken,
                        selectedTeamUID: teamuid
                    })
                })
                .then(res => res.json())
                .then(dates => 
                    dispatch({
                        type: GET_TEAM_DATES,
                        payload: dates
                    })
                )
            })
        })
    }
}