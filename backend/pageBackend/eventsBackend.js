const express = require("express");
const router = express.Router();
const colors = require("colors");
const eventUtilities = require("../firebaseUtilities/eventUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");
const teamUtilities = require("../firebaseUtilities/teamUtilities");

router.post('/', getEvents);
router.post('/newholder', createEventHolder);
router.post('/new', createEvent);
router.post('/addrunner', addRunner);
router.post('/newtime', newTime);
router.post('/refreshevent', refreshEvent);
router.post('/getholders', getEventHolders);
router.post('/getholderevents', getHolderEvents);

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

async function getEventHolders(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}")
    return;
  }

  eventUtilities.getTeamEventHolders(data.selectedTeamUID).then(eventHolders => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(eventHolders));
  }).catch(err => {
    console.log("Error grabbing the eventholders")
    console.log(err);
    res.end("{}");
  })
}

async function getHolderEvents(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body

  eventUtilities.getHolderEvents(data.holderUID).then(events => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events))
  }).catch(err => {
    console.log("Error grabbing the events from the holder")
    console.log(err);
  })
}

async function createEvent(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const name = data.eventData.name;
  const date = data.eventData.date;
  const distance = data.eventData.distance;
  const distanceUnit = data.eventData.distanceUnit;

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }

  eventUtilities.createEvent(data.selectedHolder, data.selectedTeamUID, name, date, distance, distanceUnit, req.session.useruid).then((event) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch((error) => {
    console.log("Error adding and fetching Events".red);
    console.log(error);
    res.end("{}");
  })
}

async function createEventHolder(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  const name = data.eventData.name;
  const date = data.eventData.date;
  const date2 = data.eventData.date2;
  const location = data.eventData.location;

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end('{}');
    return;
  }

  if(date2 === undefined){
    eventUtilities.createEventHolder1(data.selectedTeamUID, name, date, location, req.session.useruid).then(event => {
      res.setHeader('Content-Type', 'application/json');
      console.log("Event to return:")
      res.end(JSON.stringify(event));
    }).catch(err => {
      console.log("Error adding and fetching the eventholder (1)")
      console.log(err);
      res.end("{}")
    })
  } else {
    eventUtilities.createEventHolder2(data.selectedTeamUID, name, date, date2, location, req.session.useruid).then(event => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(event));
    }).catch(err => {
      console.log("Error adding and fetching the eventholder (1)")
      console.log(err);
      res.end("{}")
    })
  }
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
  const date = data.date;

  const runnersAdded = await eventUtilities.addRunnerToEvent(eventuid, runnerUidArray, date);
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