const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;
const teamUtilites = require("./teamUtilities");
const { median } = require('mathjs');

// -------------- Runners ----------------

async function getTeamRunners(teamuid){
  const startTime = Date.now();
  const teamRunnersRef = database.ref("teams/" + teamuid + "/runners");
  let runners = {};

  await teamRunnersRef.once("value").then(async (snapshot) => {
    let runnerArray = [];
    snapshot.forEach(function(child) {
      runnerArray.push(child);
    });

    for (const runner of runnerArray){
      const value = runner.key;
      await database.ref("runners/" + value).once("value").then((runnerSnapshot) => {
        runners[value] = runnerSnapshot.val();
      });
    }
  });

  return runners;
}

async function createRunner(teamuid, name, email, experience, gradYear, wPace, v02, dateAdded){ 
  const runnerRef = await database.ref("runners").push();

  let v02History = {}
  let v02Values = {
    values : {

    }
  }
  v02Values.values[runnerRef.key.toString()] = v02;
  console.log("Break")
  console.log(v02Values);
  v02History[dateAdded] = v02Values;

  let wPaceHistory = {};
  let wPaceValues = {
    values : {

    }
  };
  wPaceValues.values[runnerRef.key.toString()] = wPace
  wPaceHistory[dateAdded] = wPaceValues;

  const newRunner = {
    name,
    email,
    experience,
    gradYear,
    wPace,
    v02,
    dateAdded,
    v02History,
    wPaceHistory,
    key: runnerRef.key.toString()
  }

  runnerRef.set(newRunner).then(() => {
    addRunnerToTeam(teamuid, runnerRef.key, dateAdded);
    console.log("Created Runner".green)
  }).catch((err) => {
    console.log("Unable to create runner ".red + name.blue);
    console.log(err.toString());
  });
  medianV02Values(dateAdded, runnerRef.key.toString())
  medianWPaceValues(dateAdded, runnerRef.key.toString())
  return newRunner;
  
}

async function addRunnerToTeam(teamuid, runneruid, date){
  await database.ref("teams/" + teamuid + "/runners").child(runneruid.toString()).set(runneruid)
  .then(() => {
    teamUtilites.getTeamV02(teamuid, date);
    console.log("Added runner".green + runneruid.green +  "to the team".green + teamuid.green)
  })
   .catch((err) => {
      console.log("Unable to add runner ".red + runneruid.red +" to ".red);
      console.log(err);
    });

}

async function updateRunner(runnerUID, toUpdate, newValue){
  const runnerRef = await database.ref("runners/" + runnerUID);
  await runnerRef.child(toUpdate).set(newValue).catch((error) => {
    console.log("Error updating the runner in firebase")
    console.log(error)
  });
  let runnerToReturn = null;
  await database.ref('runners/' + runnerUID).once('value').then((runnerSnapshot) => {
      runnerToReturn = runnerSnapshot.val();
  })
  return runnerToReturn;

}

async function medianV02Values(date, runneruid){
  const runnerV02Ref = await database.ref("runners/" + runneruid + "/v02History/" + date + "/values");
  let values = [];
  await runnerV02Ref.once("value").then(async (valueSnapshot) => {
    valueSnapshot.forEach(function(child) {
      values.push(child.val());
    })
  })
  let v02s = [];
  values.map(val => {
    v02s.push(val)
  })
  let medV02 = 0;
  if(v02s.length > 0){
    medV02 = median(v02s)
  }
  await database.ref("runners/" + runneruid + "/v02History/" + date).child("v02").set(medV02).then(() => {})
  .catch(err => {
    console.log("Error updating the runner's v02 history".red)
    console.log(err);
  })
}

async function medianWPaceValues(date, runneruid){
  const runnerWPaceRef = await database.ref("runners/" + runneruid + "/wPaceHistory/" + date + "/values");
  let values = [];
  await runnerWPaceRef.once("value").then(async (valueSnapshot) => {
    valueSnapshot.forEach(function (child) {
      values.push(child.val())
    })
  })
  let wPaces = [];
  values.map(val => {
    wPaces.push(stringToNumber(val))
  })
  let medWPace = 0;
  if(wPaces.length > 0){
    medWPace = median(wPaces);
  }
  console.log(medWPace);
  await database.ref("runners/" + runneruid + "/wPaceHistory/" + date).child("wPace").set(getPaceString(medWPace))
  .then(() => {})
  .catch(err => {
    console.log("Error updating the runner's wPace history".red)
    console.log(err);
  })
}

// ------------ See TimeConversions in the client for more information ---------------
function stringToNumber(prevString) {
  const toSubString = prevString.indexOf(':');
  const minutes = Number(prevString.substring(0, toSubString));
  const seconds = Number(prevString.substring(toSubString + 1));
  return(totalTheTime(minutes, seconds));
}

function totalTheTime(minutes, seconds) { // returns number of seconds per mile
  let toReturn = 0.0;
  toReturn += minutes * 60;
  toReturn += seconds;
  return toReturn;
}

// ------------ See V02Max in the client for more information ---------------
function getPaceString(seconds){
  // eslint-disable-next-line
  const initialMinutes = seconds / 60;
  const minutes = Math.trunc(seconds / 60);
  const minutesAnswer = minutes.toString();
  const remainingSeconds = Math.trunc(seconds - (60 * minutes));
  const remainingSecondsAnswer = remainingSeconds.toString();
  if((seconds - (60 * minutes)) === 0){
      return minutesAnswer + ":00"
  } else if(remainingSeconds < 10 && remainingSeconds !== 0){
      return minutesAnswer + ":0" + remainingSecondsAnswer;
  } else {
      return minutesAnswer + ":" + remainingSecondsAnswer;
  }
}

module.exports.getTeamRunners = getTeamRunners;
module.exports.createRunner = createRunner;
module.exports.addRunnerToTeam = addRunnerToTeam;
module.exports.updateRunner = updateRunner;
module.exports.medianV02Values = medianV02Values;
module.exports.medianWPaceValues = medianWPaceValues;
