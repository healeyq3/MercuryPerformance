
const express = require("express");
const router = express.Router();
const colors = require("colors");
const teamUtilities = require("../firebaseUtilities/teamUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");

router.post('/', getTeams);
router.post('/new', createTeam);
router.post('/update', updateTeam);

module.exports = router;

async function getTeams(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  await teamUtilities.getUserTeams(req.session.useruid).then((teams) => {
    const teamsJson = JSON.stringify(teams);
    res.setHeader('Content-Type', 'application/json');
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.end(teamsJson);
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

async function updateTeam(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const teamUID = data.teamUID;
  const toUpdate = data.toUpdate;
  const newValue = data.newValue;

teamUtilities.updateTeam(teamUID, toUpdate, newValue).then((team) => {
  res.setHeader('Content-Type', 'application/json');
  const teamJson = JSON.stringify(team);
  res.end(teamJson);
}).catch((err) => {
  console.log("Error updating and fetching the team".red);
  console.log(err);
})

}
