const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;
const teamUtilies = require('./teamUtilities');
const { median } = require('mathjs')

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
          getEventPriorData(eventuid);
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
  getEventPriorData(eventuid);
  return runnersAdded;
}

async function getEventPriorData(eventuid){
  const runnersRef = database.ref("events/" + eventuid + "/runners");
  let runnerArray = []
  let vValues = [];
  let wPValues = [];

  await runnersRef.once("value").then(async (snapshot) => {
    snapshot.forEach(function(child){
      runnerArray.push(child.val());
    })
  })
  runnerArray.map((runner) => {
    vValues.push(runner.priorV02)
    wPValues.push(stringToNumber(runner.priorWPace))
  })

  priorMedianEventV02 = median(vValues);
  priorMedianEventWPace = secondsToMinutes(median(wPValues));
  
  await database.ref("events/" + eventuid).child("priorMedianEventV02").set(priorMedianEventV02).then(() => {
    console.log("Successfully updated the prior median v02 for the event".green)
  }).catch(err => {
    console.log("Was unable to set the prior median v02 for the event".red);
    console.log(err);
  })

  await database.ref("events/" + eventuid).child("priorMedianEventWPace").set(priorMedianEventWPace).then(() => {
    console.log("Successfully updated the prior median wPace for the event".green)
  }).catch(err => {
    console.log("Was unable to set the prior median wPace for the event".red);
    console.log(err);
  })

}

async function newTime(timeData, splitData, raceV02, raceWPace, eventuid, selectedteamuid, runneruid, date){
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
  await database.ref("events/" + eventuid + "/runners/" + runneruid).child("raceV02").set(raceV02).then(() => {
    getPostRaceData(eventuid, selectedteamuid, date)
  }).catch(() => {
    console.log("Error changing the raceV02 for the runner ".red + runneruid.red)
  })
  await database.ref("events/" + eventuid + "/runners/" + runneruid).child("raceWPace").set(raceWPace).then(() => {
  }).catch(() => {
    console.log("Error changing the raceV02 for the runner ".red + runneruid.red)
  })
}

async function getPostRaceData(eventuid, teamUID, date){
  const runnersRef = database.ref("events/" + eventuid + "/runners");
  let runnerArray = []
  let vValues = [];
  let wPValues = [];

  await runnersRef.once("value").then(async (snapshot) => {
    snapshot.forEach(function(child){
      runnerArray.push(child.val());
    })
  })
  runnerArray.map((runner) => {
    if(runner.raceV02 !== undefined){
      vValues.push(runner.raceV02)
    }
    if(runner.raceWPace !== undefined){
      wPValues.push(stringToNumber(runner.raceWPace))
    }
  })

  postRaceV02 = median(vValues);
  postRaceWPace = secondsToMinutes(median(wPValues));
  
  await database.ref("events/" + eventuid).child("postRaceV02").set(postRaceV02).then(() => {
    console.log("Successfully updated the post median v02 for the event".green)
  }).catch(err => {
    console.log("Was unable to set the post median v02 for the event".red);
    console.log(err);
  })

  await database.ref("events/" + eventuid).child("postRaceWPace").set(postRaceWPace).then(() => {
    console.log("Successfully updated the post median wPace for the event".green)
  }).catch(err => {
    console.log("Was unable to set the post median wPace for the event".red);
    console.log(err);
  })
  console.log(date);

  teamUtilies.getTeamV02(teamUID, date);
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

async function refreshEvent(eventuid){
  let eventToReturn = null;
  await database.ref("events/" + eventuid).once("value").then(eventSnapshot => {
    eventToReturn = eventSnapshot.val();
  })
  return eventToReturn
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

// ------------ See TimeConversions in the client for more information ---------------
function stringToNumber(prevString) {
  const toSubString = prevString.indexOf(':');
  const minutes = Number(prevString.substring(0, toSubString));
  const seconds = Number(prevString.substring(toSubString + 1));
  return(totalTheTime(minutes, seconds));
}

function totalTheTime(minutes, seconds) {
  let toReturn = 0.0;
  toReturn += minutes * 60;
  toReturn += seconds;
  return toReturn;
}

function secondsToMinutes(seconds){
  return (seconds / 60);
}

module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;
module.exports.addRunnerToEvent = addRunnerToEvent;
module.exports.removeRunnerFromEvent = removeRunnerFromEvent;
module.exports.newTime = newTime;
module.exports.getEventPriorData = getEventPriorData;
module.exports.refreshEvent = refreshEvent;