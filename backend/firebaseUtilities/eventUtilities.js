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
    }).catch((err) => {
      console.log("Unable to add event ".red + eventuid.red +" to "+ teamuid.toString().red);
      console.log(err);
    });
}

async function getTeamEvents(teamuid){
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
  return events;
}

async function addRunnerToEvent(eventuid, runnerUidArray){
  let runnersAdded = {};
  const eventRef = database.ref("events/" + eventuid + "/runners");
  for(const runner in runnerUidArray) {
    //check if runner is already added
    eventRef.once("value").then((snapshot) => {
      if(!snapshot.hasChild(runner)) {
        runnersAdded[runner] = runnerUidArray[runner];
        eventRef.child("" + runner).set(runnerUidArray[runner]).then(() => {
        }).catch(() => {
          console.log("Error adding runner ".cyan + runneruid + " to ".cyan + eventuid);
        })
        database.ref("runners/" + runner + "/events/").child(eventuid).set(eventuid).then(() => {
          console.log("Successfully added the event " + eventuid.green + " to the runner" + runner.green )
        }).catch(err => {
          console.log("Un-successfully added the event ".red + eventuid + " to the runner" + runner);
          console.log(err);
        })
      }
    })
  };

  return runnersAdded;
}

async function newTime(timeData, splitData, eventuid, selectedteamuid, runneruid){
  const eventTimeRef = await database.ref("events/" + eventuid + "/runners/" + runneruid + "/time")
  const eventSplitRef = await database.ref("events/" + eventuid + "/runners/" + runneruid + "/splits")
  await eventTimeRef.set(timeData).catch((error) => {
    console.log(error);
  });
  if(splitData.splits){
    await eventSplitRef.set(splitData.splits).catch((error) => {
      console.log(error);
    });
  }
}

async function removeRunnerFromEvent(eventuid, runneruid){
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