const express = require("express");
const router = express.Router();
const colors = require("colors");
const runnerUtilities = require("../firebaseUtilities/runnerUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");
const teamUtilities = require("../firebaseUtilities/teamUtilities");

router.post('/', getRunners);
router.post('/new', createRunner);
router.post('/update', updateRunner);

module.exports = router;

async function getRunners(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }

  runnerUtilities.getTeamRunners(data.selectedTeamUID).then((runners) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(runners));
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });
}

async function createRunner(req, res){
  if(!await authenticatePost(req, res)){
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
  const date = data.runnerData.dateAdded;
  console.log(date);

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }

  runnerUtilities.createRunner(data.selectedTeamUID, name, email, experience, gradYear, wPace, v02, date).then((runner) => {
    res.setHeader('Content-Type', 'application/json');
    const runnerJson = JSON.stringify(runner);
    res.end(runnerJson);
  }).catch((error) => {
    console.log("Error adding and fetching Runners".red);
    console.log(error);
  });
}

async function updateRunner(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const runnerUID = data.runnerUID;
  const toUpdate = data.toUpdate;
  const newValue = data.newValue;

runnerUtilities.updateRunner(runnerUID, toUpdate, newValue).then((runner) => {
  res.setHeader('Content-Type', 'application/json');
  const runnerJson = JSON.stringify(runner);
  res.end(runnerJson);
}).catch((err) => {
  console.log("Error updating and fetching the runner".red);
  console.log(err);
})

}