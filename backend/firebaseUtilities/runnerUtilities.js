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

async function createRunner(teamuid, name, email, experience, gradYear, wPace, v02, dateAdded){ //THIS FUNCTION IS WAY TOO INEFFICIENT
  const runnerRef = await database.ref("runners").push();
  v02History = {}
  v02History[dateAdded] = v02
  wPaceHistory = {};
  wPaceHistory[dateAdded] = wPace
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
    updatedTeam = addRunnerToTeam(teamuid, runnerRef.key, dateAdded);
    console.log("Created Runner".green)
  }).catch((err) => {
    console.log("Unable to create runner ".red + name.blue);
    console.log(err.toString());
  });
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

module.exports.getTeamRunners = getTeamRunners;
module.exports.createRunner = createRunner;
module.exports.addRunnerToTeam = addRunnerToTeam;
module.exports.updateRunner = updateRunner;
