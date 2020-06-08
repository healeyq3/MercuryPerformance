import { database } from "./firebaseSetup";

// -------------- Runners ----------------

export async function getTeamRunners(teamuid){
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

export async function createRunner(teamuid, name, email, experience, gradYear, wPace, v02){
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

export async function addRunnerToTeam(teamuid, runneruid){
  await database.ref("teams/" + teamuid + "/runners").child(runneruid.toString()).set(runneruid)
    .then(() => {
      console.log("Successfully added runner ".red + runneruid.red +" to ".red);
    }).catch((err) => {
      console.log("Unable to add runner ".red + runneruid.red +" to ".red);
      console.log(err);
    });
}
