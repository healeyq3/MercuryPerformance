
const express = require("express");
const router = express.Router();
const teamUtilities = require("../firebaseUtilities/teamUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");

router.post('/', getTeams);
router.post('/new', createTeam);
router.post('/update', updateTeam);
router.post('/updateV02', updateV02);
router.post('/refreshteam', refreshTeam);

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

async function updateV02(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const teamUID = data.teamUID;
  const date = data.date

  teamUtilities.getTeamV02(teamUID, date).then((team) => {
    res.setHeader('Content-Type', 'application/json');
    const teamJson = JSON.stringify(team);
    res.end(teamJson);
  }).catch(err => {
    console.log("Error updating and fetching the team's v02max")
    console.log(err);
  })
}

async function refreshTeam(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const teamUID = req.body.teamUID;
  console.log("Got to before the refresh team is called for firebaseutils")

  teamUtilities.refreshTeam(teamUID).then((team) => {
    res.setHeader('Content-Type', 'application/json');
    const teamJson = JSON.stringify(team);
    res.end(teamJson)
  }).catch(err => {
    console.log("Error refreshing and fetching the team");
    console.log(err);
  })
}
