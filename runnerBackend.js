const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("./firebaseUtils");

router.post('/', async (req, res) => {
  let authenticationSuccess = true;
  await firebaseUtils.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end();
    return;
  }

  const data = req.body;

  firebaseUtils.getTeamRunners(req.session.user, data.teamUID).then((runners) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(runners));
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });
});

router.post('/new', async (req, res) => {
  let authenticationSuccess = true;
  await firebaseUtils.authenticatePost(req, res).then((success) => {
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


  firebaseUtils.createRunner(req.session.user, data.selectedTeamUID, name, email, experience, gradYear, wPace).then((teams) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(runners));
    console.log("post over");
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end("{}");
  })
});

module.exports = router;