const express = require("express");
const router = express.Router();
const colors = require("colors");
const teamUtilities = require("../firebaseUtilities/teamUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");

router.post('/', getTeams);
router.post('/new', createTeam);

module.exports = router;

async function getTeams(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const startTime = Date.now();
  await teamUtilities.getUserTeams(req.session.useruid).then((teams) => {
    res.setHeader('Content-Type', 'application/json');

    const teamsJson = JSON.stringify(teams);
    res.end(teamsJson);
    console.log("Done fetching teams - time: ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });
}

async function createTeam(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;

  teamUtilities.createTeam(req.session.useruid, data.teamData.teamName, data.teamData.teamYear, data.teamData.teamLevel).then((team) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(team));
  }).catch((error) => {
    console.log("Error adding and fetching teams".red);
    console.log(error);
    res.end("{}");
  })
}
