const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("../firebaseUtils");

router.post('/', async (req, res) => {
  let authenticationSuccess = true;
  await firebaseUtils.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end("{}");
    return;
  }

  const startTime = Date.now();
  await firebaseUtils.getUserTeams(req.session.useruid).then((teams) => {
    res.setHeader('Content-Type', 'application/json');

    const teamsJson = JSON.stringify(teams);
    res.end(teamsJson);
    console.log("Done fetching teams - time: ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
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

  firebaseUtils.createTeam(req.session.useruid, data.teamData.teamName, data.teamData.teamYear, data.teamData.teamLevel).then((team) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(team));
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end("{}");
  })
});

module.exports = router;