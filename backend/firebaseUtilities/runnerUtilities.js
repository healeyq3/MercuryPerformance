const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;

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

  console.log("Finished Get Runners - ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
  return runners;
}

async function createRunner(teamuid, name, email, experience, gradYear, wPace, v02){
  console.log("Creating Runner".red);

  const runnerRef = await database.ref("runners").push();

  const newRunner = {
    name,
    email,
    experience,
    gradYear,
    wPace,
    v02,
    key: runnerRef.key.toString()
  }

  runnerRef.set(newRunner).then(() => {
    console.log("Successfully created Runner ".red + name.blue);
    addRunnerToTeam(teamuid, runnerRef.key);
  }).catch((err) => {
    console.log("Unable to create runner ".red + name.blue);
    console.log(err.toString());
  });

  return newRunner;
}

async function addRunnerToTeam(teamuid, runneruid){
  await database.ref("teams/" + teamuid + "/runners").child(runneruid.toString()).set(runneruid)
    .then(() => {
      console.log("Successfully added runner ".red + runneruid.red +" to ".red);
    }).catch((err) => {
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
  let runnerToReturn;
  await database.ref('runners/' + runnerUID).once('value').then((runnerSnapshot) => {
      runnerToReturn = runnerSnapshot.val();
      console.log('---');
      console.log(runnerSnapshot.val());
  })

  console.log('Successfully Returned');
  console.log(runnerToReturn);
  return runnerToReturn;

}

module.exports.getTeamRunners = getTeamRunners;
module.exports.createRunner = createRunner;
module.exports.addRunnerToTeam = addRunnerToTeam;
module.exports.updateRunner = updateRunner;
