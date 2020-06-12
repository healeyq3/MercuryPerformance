const express = require("express");
const router = express.Router();
const colors = require("colors");
const eventUtilities = require("../firebaseUtilities/eventUtilities");
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");
const teamUtilities = require("../firebaseUtilities/teamUtilities");

router.post('/', getEvents);
router.post('/new', createEvent);
router.post('/addrunner', addRunner);
router.post('/newtime', newTime);//I don't think this is actually sending it to newTime

module.exports = router;

async function getEvents(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  const data = req.body;
  if(!await teamUtilities.doesUserOwnTeam(req)){
    console.log("User does not own team they tried to access".red);
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

  eventUtilities.createEvent(data.selectedTeamUID, name, date, location, distance, distanceUnit).then((event) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event));
  }).catch((error) => {
    console.log("Error adding and fetching Events".red);
    console.log(error);
    res.end("{}");
  })
}


async function newTime(req, res){//doesn't run
  console.log("in events backend")
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }
  console.log()
  const data = req.body;
  const finalTime = data.timeData.finalTimeData;
  const splits = data.timeData.splits;

  if(!await teamUtilities.doesUserOwnTeam(req)){
    res.end("{}");
    return;
  }
  eventUtilities.newTime(data.timeData, data.selectedTeamUID, data.eventUID, data.runnerUID ).then((time) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(time));
  }).catch((error) => {
    console.log("Error adding and fetching times".red);
    console.log(error);
    res.end("{}");
  })
}

async function addRunner(req, res){
  if(!await authenticatePost(req, res)){
    res.end();
    return;
  }

  console.log("Adding runner to event".green);

  const data = req.body;
  const runnerUidArray = data.runnerUidArray;
  const eventuid = data.eventuid;

  const runnersAdded = await eventUtilities.addRunnerToEvent(eventuid, runnerUidArray);
  res.end(JSON.stringify({
      runnersAdded: runnersAdded,
      eventuid: eventuid
    })
  );
}