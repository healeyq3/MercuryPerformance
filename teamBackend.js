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

  firebaseUtils.createTeam(req.session.user, data.teamData.teamName, data.teamData.teamYear, data.teamData.teamLevel).then((teams) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(teams));
    console.log("post over");
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end("{}");
  })
});

module.exports = router;
