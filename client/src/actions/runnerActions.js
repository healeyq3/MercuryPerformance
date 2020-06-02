import {NEW_RUNNER} from './types';
import cookie from 'react-cookies'

// export function getRunners(selectedTeamUID) {
//   return async function(dispatch){
//     console.log("SENDING TEAMUID "+selectedTeamUID);
//     await fetch('/runners', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         idToken: cookie.load('idToken'),
//         teamUID: selectedTeamUID
//       })
//     })
//       .then(res => res.json())
//       .then(function(runners){
//           dispatch({
//             type: GET_RUNNERS,
//             payload: runners
//           })
//       });
//   }
// }

export function newRunner(runnerData, selectedTeamUID){
  return async function(dispatch) {
    console.log("Creating new runner");
    await fetch('/runners/new', {
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
