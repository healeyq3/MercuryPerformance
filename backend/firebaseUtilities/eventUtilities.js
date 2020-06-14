const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;

// -------------- Events ----------------

async function createEvent(teamuid, name, date, location, distance, distanceUnit){
  const eventRef = await database.ref("events").push();

  const eventData = {
    name,
    date,
    location,
    distance,
    distanceUnit,
    key: eventRef.key.toString()
  }

  eventRef.set(eventData).then(async () => {
    console.log("Successfully created event ".red + name.blue);
    await addEventToTeam(teamuid, eventRef.key);
  }).catch((err) => {
    console.log("Unable to create event ".red + name.blue);
    console.log(err.toString());
  });

  return eventData;
}

async function addEventToTeam(teamuid, eventuid){
  await database.ref("teams/" + teamuid.toString() + "/events").child(eventuid.toString()).set(eventuid)
    .then(() => {
      console.log("Successfully added event ".red + eventuid.red +" to ".red + teamuid.toString().red);
    }).catch((err) => {
      console.log("Unable to add event ".red + eventuid.red +" to "+ teamuid.toString().red);
      console.log(err);
    });
}

async function getTeamEvents(teamuid){
  const startTime = Date.now();
  const teamEventsRef = database.ref("teams/" + teamuid.toString() + "/events");
  let events = {};

  await teamEventsRef.once("value").then(async (snapshot) => {
    let eventsArray = [];
    snapshot.forEach(function(child) {
      eventsArray.push(child);
    });

    for (const event of eventsArray){
      const value = event.key;
      await database.ref("events/" + value).once("value").then((eventSnapshot) => {
        events[value] = eventSnapshot.val();
      }).catch((error) => {
        console.log("Error in getTeamEvents - database ref events/value".red);
        console.log(error);
      })
    }
  }).catch((error) => {
    console.log("Error in getTeamEvents".red);
    console.log(error);
  })
  console.log("Finished Get Events - ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
  return events;
}

async function addRunnerToEvent(eventuid, runnerUidArray){
  console.log(runnerUidArray);
  console.log(eventuid);

  let runnersAdded = {};
  const eventRef = database.ref("events/" + eventuid + "/runners");
  runnerUidArray.forEach((runneruid) => {
    //check if runner is already added
    eventRef.once("value").then((snapshot) => {
      if(!snapshot.hasChild(runneruid)) {
        console.log("runneruid: " + runneruid);
        runnersAdded[runneruid] = {runneruid: runneruid};
        eventRef.child("" + runneruid).set({runneruid: runneruid}).then(() => {
          console.log("Successfully added runner ".cyan + runneruid + " to ".cyan + eventuid);
        }).catch(() => {
          console.log("Error adding runner ".cyan + runneruid + " to ".cyan + eventuid);
        })
      } else {
        console.log("Did not add runner because runner already exists under event".yellow);
      }
    })
  });

  return runnersAdded;
}

function newTime(timeData, eventuid, selectedteamuid, runneruid){
  console.log("Time event id" + eventuid + " " + runneruid)
  const eventTimeRef = database.ref("events/" + eventuid + "/runners/" + runneruid + "/times")
  eventTimeRef.set(timeData.finalTime).then(() => {

  }).catch((error) => {
    console.log(error);
  });
}

async function removeRunnerFromEvent(eventuid, runneruid){
  console.log("Removing runner".green + "(".cyan + runneruid.cyan + ")".cyan +" from team".green + "(".cyan + eventuid.cyan + ")".cyan);
  const eventRunnerRef = database.ref("events/"+eventuid+"/runners/"+runneruid);

  let successfulDelete = true;

  await eventRunnerRef.once("value").then((snapshot) => {
    //Check if the runner exists - if not, return false
    if(snapshot.val() == null){
      successfulDelete = false;
      return;
    }

    eventRunnerRef.remove();
  })
  return successfulDelete;
}

async function doesEventBelongToTeam(req){
  const teamuid = req.body.selectedTeamUID;
  const eventuid = req.body.eventuid;

  if(!eventuid){
    console.log("eventuid not passed for events - returning null".red);
    return false;
  }
  const eventRef = database.ref("teams/"+teamuid+"/events");
  return eventRef.once("value").then((snapshot) => {
    return snapshot.hasChild(eventuid);
  });
}

module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;
module.exports.addRunnerToEvent = addRunnerToEvent;
module.exports.removeRunnerFromEvent = removeRunnerFromEvent;
module.exports.newTime = newTime;