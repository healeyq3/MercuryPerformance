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

  firebaseUtils.getUserTeams(req.session.user).then((teams) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(teams));
  }).catch((error) => {
    console.log(error);
    res.end();
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
  firebaseUtils.createTeam(data.user, data.teamName, data.teamYear, data.teamLevel, data.teamWorkoutFormula).then((teams) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(teams));
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end();
  })
});

module.exports = router;
