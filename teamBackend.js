const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("./firebaseUtils");

router.post('/', async (req, res) => {
  const startTime = Date.now();
  console.log("Starting getTeams at ".green + startTime);

  let authenticationSuccess = true;
  // await firebaseUtils.authenticatePost(req, res).then((success) => {
  //   authenticationSuccess = success;
  // })
  if(!authenticationSuccess){
    res.end("{}");
    return;
  }

  console.log("Finished authentication at ".green + (Date.now()-startTime));

  await firebaseUtils.getUserTeams(req.session.user).then((teams) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("Sending teams: ".cyan+Object.keys(teams).length);
    res.end(JSON.stringify(teams));
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });

  console.log("Execution of getTeams took ".green+(Date.now()-startTime));
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

  firebaseUtils.createTeam(req.session.user, data.teamData.teamName, data.teamData.teamYear, data.teamData.teamLevel).then((team) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(team));
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end("{}");
  })
});

module.exports = router;
