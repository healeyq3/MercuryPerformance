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
  
    const data = req.body;
    if(!await firebaseUtils.doesUserOwnTeam(req.session.useruid, data.selectedTeamUID)){
      res.end("{}");
      return;
    }

    firebaseUtils.getTeamEvents(data.selectedTeamUID).then((events) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(events));
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
  const name = data.eventData.name;
  const date = data.eventData.date;
  const location = data.eventData.location;

  if(!await firebaseUtils.doesUserOwnTeam(req.session.useruid, data.selectedTeamUID)){
    res.end("{}");
    return;
  }

  firebaseUtils.createEvent(data.selectedTeamUID, name, date, location).then((event) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch((error) => {
    console.log("Error adding and fetching Events".red);
    console.log(error);
    res.end("{}");
  })
});
module.exports = router;