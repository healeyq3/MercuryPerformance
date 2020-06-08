const express = require("express");
const router = express.Router();
const colors = require("colors");
const eventUtilities = require("../firebaseUtilities/eventUtilities");
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
    if(!await teamUtilities.doesUserOwnTeam(req.session.useruid, data.selectedTeamUID)){
      res.end("{}");
      return;
    }

    eventUtilities.getTeamEvents(data.selectedTeamUID).then((events) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(events));
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
  const name = data.eventData.name;
  const date = data.eventData.date;
  const location = data.eventData.location;

  if(!await teamUtilities.doesUserOwnTeam(req.session.useruid, data.selectedTeamUID)){
    res.end("{}");
    return;
  }

  eventUtilities.createEvent(data.selectedTeamUID, name, date, location).then((event) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch((error) => {
    console.log("Error adding and fetching Events".red);
    console.log(error);
    res.end("{}");
  })
});

router.post('/addrunner', async (req, res) => {

});

module.exports = router;