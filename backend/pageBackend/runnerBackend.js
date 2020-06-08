const express = require("express");
const router = express.Router();
const colors = require("colors");
const runnerUtilities = require("../firebaseUtilities/runnerUtilities");
const authenticationUtilities = require("../firebaseUtilities/authenticationUtilities");
const teamUtilities = require("../firebaseUtilities/teamUtilities");


router.post('/', async (req, res) => {
  let authenticationSuccess = true;
  await authenticationUtilities.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end("{}");
    return;
  }

  const data = req.body;

  if(!await teamUtilities.doesUserOwnTeam(req.session.useruid, data.teamUID)){
    res.end("{}");
    return;
  }

  runnerUtilities.getTeamRunners(data.teamUID).then((runners) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(runners));
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });
});

router.post('/new', async (req, res) => {
  let authenticationSuccess = true;
  await authenticationUtilities.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end();
    return;
  }

  const data = req.body;
  const name = data.runnerData.runnerName;
  const email = data.runnerData.runnerEmail;
  const experience = data.runnerData.runnerExperience;
  const gradYear = data.runnerData.runnerGradYear;
  const wPace = data.runnerData.runnerWorkoutPace;
  const v02 = data.runnerData.runnerV02Max;

  if(!await teamUtilities.doesUserOwnTeam(req.session.useruid, data.teamUID)){
    res.end("{}");
    return;
  }

  runnerUtilities.createRunner(data.selectedTeamUID, name, email, experience, gradYear, wPace, v02).then((runner) => {
    res.setHeader('Content-Type', 'application/json');
    const runnerJson = JSON.stringify(runner);
    res.end(runnerJson);
  }).catch((error) => {
    console.log("Error adding and fetching Runners".red);
    console.log(error);
    res.end("{}");
  });
});

module.exports = router;