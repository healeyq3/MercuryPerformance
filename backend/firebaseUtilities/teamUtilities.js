const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;
const runnerUtilities = require('./runnerUtilities');
const { median } = require('mathjs')

// -------------- Team ----------------
async function createTeam(useruid, teamName, teamYear, teamLevel){
  const teamRef = await database.ref("teams").push();

  const newTeam = {
    teamName: teamName,
    coach: useruid,
    year: teamYear,
    level: teamLevel,
    key: teamRef.key.toString()
  }


  teamRef.set(newTeam).then(() => {
    addTeamToUser(useruid, teamRef.key, "coach");
  }).catch((err) => {
    console.log("Unable to create team ".red + teamName.blue);
    console.log(err.toString());
  });

  return newTeam;
}

async function addTeamToUser(useruid, teamuid, role){
  database.ref("users/" + useruid + "/teams").child(teamuid.toString()).set({
    role : role
  }).then(() => {
  }).catch((err) => {
    console.log("Unable to add team ".red + teamuid.red +" to ".red + useruid.blue);
    console.log(err);
  });
}

async function getUserTeams(useruid){
  const teamsRef = database.ref("users/"+useruid+"/teams");
  let teams = {};
  await teamsRef.once("value").then(async (snapshot) => {
    let teamArray = [];
    snapshot.forEach(function(child) {
      teamArray.push(child);
    });
    for (const team of teamArray){
      const value = team.key;
      await database.ref("teams/" + value).once("value").then((teamSnapshot) => {
        teams[value] = teamSnapshot.val();
      });
    }
  });
  return teams;
}

async function doesUserOwnTeam(req){
  const useruid = req.session.useruid;
  const teamuid = req.body.selectedTeamUID;

  if(!teamuid){
    console.log("teamuid not passed - returning null".red);
    return false;
  }
  const teamRef = database.ref("users/"+useruid+"/teams");
  return teamRef.once("value").then((snapshot) => {
    return snapshot.hasChild(teamuid);
  });
}

async function updateTeam(teamUID, toUpdate, newValue){
  const teamRef = await database.ref("teams/" + teamUID);
  await teamRef.child(toUpdate).set(newValue).catch((error) => {
    console.log("Error updating the team in firebase")
    console.log(error)
  });
  let teamToReturn = null;
  await database.ref('teams/' + teamUID).once('value').then((teamSnapshot) => {
      teamToReturn = teamSnapshot.val();
  })

  return teamToReturn;

}



async function getTeamV02(teamuid, date){ //grabs the most updated team V02, and workout pace
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

  const teamV02 = await database.ref("teams/" + teamuid + "/v02History");
  const teamWPace = await database.ref("teams/" + teamuid + "/wPaceHistory");
  let values = [];
  let allValues = {};
  let wValues = [];
  let allWValues = {};
  let bestVValues = [];
  let bestWValues = [];

  for(const runner in runners){
    if(runners[runner].hasOwnProperty('v02History')){
      let v02ToAdd = runners[runner].v02History[findClosestDate(runners[runner].v02History, date)]
      values.push(v02ToAdd);
      allValues[runner] = v02ToAdd;
    }
    if(runners[runner].hasOwnProperty('wPaceHistory')){
      let wPaceToAdd = stringToNumber(runners[runner].wPaceHistory[findClosestDate(runners[runner].wPaceHistory, date)])
      wValues.push(wPaceToAdd);
      allWValues[runner] = wPaceToAdd;
    }
    if(runners[runner].hasOwnProperty("v02")){
      bestVValues.push(runners[runner].v02);
    }
    if(runners[runner].hasOwnProperty("wPace")){
      bestWValues.push(stringToNumber(runners[runner].wPace));
    }
  }

  const medianV02 = median(values);
  const medianWPace = getPaceString(median(wValues))
  const medianBestV02 = median(bestVValues);
  const medianBestWPace = secondsToMinutes(median(bestWValues));

  await database.ref("teams/" + teamuid).child("medianV02").set(medianBestV02).then(() => {
    console.log("Successfully set the median v02 for the team".green);
  }).catch(err => {
    console.log("Was unable to set the median v02 for the team".red);
    console.log(err);
  })

  await database.ref("teams/" + teamuid).child("medianWPace").set(medianBestWPace).then(() => {
    console.log("Successfully updated the median wPace for the team".green);
  }).catch(err => {
    console.log("Was unable to set the median wPace for the team".red);
    console.log(err);
  })

  information = {
    allValues,
    medianV02
  }
  informationW = {
    allValues: allWValues,
    medianWPace
  }
  await teamV02.child(date).set(information)
  .then(() => {
    console.log("V02 and its history have successfully been updated".green)
  }
  )
  .catch(err => {
    console.log("Error updating the team's V02 history data in firebase".red)
    console.log(err);
  })

  await teamWPace.child(date).set(informationW)
  .then(() => {
    console.log("WPace and its history have successfully been updated".green)
  })
  .catch(err => {
    console.log("Error updating the team's WPace history data in firebase".red)
    console.log(err);
  })

  let teamToReturn = null;
  await database.ref('teams/' + teamuid).once('value').then((teamSnapshot) => {
    teamToReturn = teamSnapshot.val();
  })

  return teamToReturn;
}

async function refreshTeam(teamuid){
  console.log("made it into refreshTeam in firebase")
  let teamToReturn = null;
  await database.ref("teams/" + teamuid).once('value').then((teamSnapshot) => {
    teamToReturn = teamSnapshot.val();
  })
  return teamToReturn;
}

async function updateTeamWorkoutHistory(date, teamuid, runneruid, workoutuid, totalDistance, resDev){ // I need to check and see if under that key there is => just add here, calculate averages somewhere else
  const indRef = "" + workoutuid + runneruid; // this way runners can have more than one workout per day without overwritting old day
  const toSet = {
    mileage : totalDistance,
    resDeviation : resDev
  }
  console.log(teamuid)
  teamMileageRef = await database.ref("teams/" + teamuid + "/mileage/" + date + '/values');
  await teamMileageRef.child(indRef).set(toSet)
  .then(() => {
    console.log("Successfully added the new values to the mileage history".green)
  }).catch(err => {
    console.log("Unsuccessfully added the new values to the mileage history".red)
    console.log(err);
  })
  await getMileageMedians(teamuid, date)
}

async function updateTeamMileageHistory_Event(date, teamuid, runneruid, eventuid, totalDist){ // just add the distance here => calculate in a different method
  const indRef = "" + eventuid + runneruid;
  const toSet = {
    mileage: totalDist
  }
  teamMileageRef = await database.ref("teams/" + teamuid + "/mileage/" + date + "/values");
  await teamMileageRef.child(indRef).set(toSet)
  .then(() => {
    console.log("Successfully added the new values to the mileage history".green)
  }).catch(err => {
    console.log("Un-Successfully added the new values to the mileage history".red)
    console.log(err);
  })
  await getMileageMedians(teamuid, date)
}

async function getMileageMedians(teamuid, date){
  teamMileageRef = await database.ref("teams/" + teamuid + "/mileage/" + date + "/values");
  let values = [];
  await teamMileageRef.once('value').then(async (valueSnapshot) => {
    valueSnapshot.forEach(function(child) {
      values.push(child.val());
    });
  })
  let tD = [];
  let dev = [];
  console.log(values);
  values.map(val => {
    if(val.mileage !== undefined){
      tD.push(val.mileage);
    }
    if(val.resDeviation !== undefined){
      dev.push(val.resDeviation)
    } 
  })
  let medDist = median(tD);
  let medDev = 0;
  if(dev.length > 0){
    medDev = median(dev);
  }
  await database.ref("teams/" + teamuid + "/mileage/" + date).child("medDist").set(medDist)
  .then(() => {
    console.log("Successfully updated the date's med distance".green)
  }).catch(err => {
    console.log("Un-Successfully updated the date's med distance".red);
    console.log(err);
  })
  await database.ref("teams/" + teamuid + "/mileage/" + date).child("medDev").set(medDev)
  .then(() => {
    console.log("Successfully updated the date's med deviation".green)
  }).catch(err => {
    console.log("Un-Successfully updated the date's med deviation".red);
    console.log(err);
  })
}

// ------------ See DateAlgos in the client for more information ---------------

function findClosestDate(historyObject, date){
  const comparisonDate = fixDateSelector(date);
  const dates = [];
  for(const date in historyObject){
      dates.push(date)
  }
  let closest = fixDateSelector(dates[0]);
  dates.map((date) => {
      let diff1 = comparisonDate - fixDateSelector(date);
      let diff2 = comparisonDate - closest;
      if(diff1 < diff2){
          closest = fixDateSelector(date)
      }
  })
  return getCleanDate(closest);
}

function getCleanDate(date){ // turns an actual date into a string representation
  const p1 = date.getFullYear();
  const p2 = date.getMonth() + 1;
  const p3 = date.getDate();
  const cleanDate = p1 + "-" + p2 + "-" + p3
  return cleanDate;
}

function fixDateSelector(date){ // turns a clean string that is used to represent a date into an actual date that can be used for calculations
  const regex = /-/gi
  const clean = date.replace(regex, ",");
  const toReturn = new Date(clean);
  return toReturn;
}

// ------------ See TimeConversions in the client for more information ---------------
function stringToNumber(prevString) {
  const toSubString = prevString.indexOf(':');
  const minutes = Number(prevString.substring(0, toSubString));
  const seconds = Number(prevString.substring(toSubString + 1));
  return(totalTheTime(minutes, seconds));
}

function totalTheTime(minutes, seconds) {
  let toReturn = 0.0;
  toReturn += minutes * 60;
  toReturn += seconds;
  return toReturn;
}

function secondsToMinutes(seconds){
  return (seconds / 60);
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

module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.doesUserOwnTeam = doesUserOwnTeam;
module.exports.updateTeam = updateTeam;
module.exports.getTeamV02 = getTeamV02;
module.exports.refreshTeam = refreshTeam;
module.exports.updateTeamWorkoutHistory = updateTeamWorkoutHistory;
module.exports.updateTeamMileageHistory_Event = updateTeamMileageHistory_Event;
module.exports.getMileageMedians = getMileageMedians;