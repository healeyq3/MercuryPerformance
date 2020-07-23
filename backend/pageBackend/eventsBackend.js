const express = require("express");
const router = express.Router();
const colors = require("colors");
const eventUtilities = require("../firebaseUtilities/eventUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");
const teamUtilities = require("../firebaseUtilities/teamUtilities");

router.post('/', getEvents);
router.post('/new', createEvent);
router.post('/addrunner', addRunner);
router.post('/newtime', newTime);
router.post('/refreshevent', refreshEvent);

module.exports = router;

async function getEvents(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  if(!await teamUtilities.doesUserOwnTeam(req)){
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
}

async function createEvent(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const name = data.eventData.name;
  const date = data.eventData.date;
  const location = data.eventData.location;
  const distance = data.eventData.distance;
  const distanceUnit = data.eventData.distanceUnit;

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }

  eventUtilities.createEvent(data.selectedTeamUID, name, date, location, distance, distanceUnit, req.session.useruid).then((event) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch((error) => {
    console.log("Error adding and fetching Events".red);
    console.log(error);
    res.end("{}");
  })
}


async function newTime(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }

  const data = req.body;

  const timeData = data.timeData;
  const splitsData = data.splitsData;
  const eventUID = data.eventUID;
  const runnerUID = data.runnerUID;
  const selectedTeamUID = data.selectedTeamUID;
  const splitsArray = data.splitsData.splits;
  const raceV02 = data.analysisData.v02;
  const raceWPace = data.analysisData.wPace;
  const date = data.date;

  eventUtilities.newTime(timeData, splitsData, raceV02, raceWPace, eventUID, selectedTeamUID, runnerUID, date);

  const toSend = {
    eventUID,
    runnerUID,
    timeData,
    splitsArray,
    raceV02,
    raceWPace
  }
  res.end(JSON.stringify(toSend));
}

async function addRunner(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const runnerUidArray = data.runnerUidArray;
  const eventuid = data.eventuid;

  const runnersAdded = await eventUtilities.addRunnerToEvent(eventuid, runnerUidArray);
  res.end(JSON.stringify({
    runnersAdded: runnersAdded,
    eventuid: eventuid
  }));
}

async function refreshEvent(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const euid = data.eventuid;

  eventUtilities.refreshEvent(euid).then(event => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch(err => {
    console.log("Error refreshing the event".red);
    console.log(err);
    res.end("{}");
  })
}