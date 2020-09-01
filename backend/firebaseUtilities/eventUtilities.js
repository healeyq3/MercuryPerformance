const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;
const teamUtilities = require('./teamUtilities');
const runnerUtilities = require('./runnerUtilities');
const { median } = require('mathjs');

// -------------- Events ----------------

async function createEvent(holderuid, teamuid, name, date, distance, distanceUnit, useruid){
  const eventRef = await database.ref("events").push();

  const eventData = {
    name,
    date,
    distance,
    distanceUnit,
    key: eventRef.key.toString(),
    holder: holderuid
  }

  eventRef.set(eventData).then(async () => {
    await addEventToTeam(teamuid, eventRef.key, date, name);
    await addEventToUser(useruid, eventRef.key, date, name);
  }).catch((err) => {
    console.log("Unable to create event ".red + name.blue);
    console.log(err);
  });
  await database.ref("eventholders/" + holderuid + "/events").child(eventRef.key.toString()).set(eventRef.key.toString()).then(() => {
    console.log("Successfully added the event to the holder")
  }).catch(err => {
    console.log("Error adding the event to the holder")
    console.log(err);
  })

  return eventData;
}

async function createEventHolder1(teamuid, name, date, location){
  const eventHolderRef = await database.ref("eventholders").push();

  const eventData = {
    name,
    date,
    location,
    key: eventHolderRef.key.toString()
  }
  eventHolderRef.set(eventData).then(async () => {
    await addEventHolderToTeam1(teamuid, eventHolderRef.key, date);
  }).catch(err => {
    console.log("Unable to create eventholder".red + name.blue);
    console.log(err);
  })

  return eventData;
}

async function addEventHolderToTeam1(teamuid, eventholderuid, date){
  await database.ref("teams/" + teamuid.toString() + '/eventholders').child(eventholderuid.toString()).child("date").set(date)
  .then(() => {
  }).catch((err) => {
    console.log("Unable to add eventholder ".red + eventholderuid.red +" to "+ teamuid.toString().red);
    console.log(err);
  });
}

async function createEventHolder2(teamuid, name, date, date2, location){
  const eventHolderRef = await database.ref("eventholders").push();

  const eventData = {
    name,
    date,
    date2,
    location,
    key: eventHolderRef.key.toString()
  }
  eventHolderRef.set(eventData).then(async () => {
    await addEventHolderToTeam2(teamuid, eventHolderRef.key, date, date2);
  }).catch(err => {
    console.log("Unable to create eventholder".red + name.blue);
    console.log(err);
  })
  return eventData;
}

async function addEventHolderToTeam2(teamuid, eventholderuid, date, date2){
  await database.ref("teams/" + teamuid.toString() + '/eventholders').child(eventholderuid.toString()).child("date").set(date)
  .then(() => {
  }).catch((err) => {
    console.log("Unable to add eventholder ".red + eventholderuid.red +" to "+ teamuid.toString().red);
    console.log(err);
  });
  await database.ref("teams/" + teamuid.toString() + '/eventholders').child(eventholderuid.toString()).child("date").set(date2)
  .then(() => {
  }).catch((err) => {
    console.log("Unable to add eventholder ".red + eventholderuid.red +" to "+ teamuid.toString().red);
    console.log(err);
  });
}

async function addEventToTeam(teamuid, eventuid, date, name){
  await database.ref("teams/" + teamuid.toString() + "/events").child(eventuid.toString()).child("date").set(date)
    .then(() => {
    }).catch((err) => {
      console.log("Unable to add event ".red + eventuid.red +" to "+ teamuid.toString().red);
      console.log(err);
    });
  await database.ref("teams/" + teamuid + "/events/" + eventuid).child("name").set(name).then(() => {})
  .catch(err => {
    console.log("error adding the name to the event in its team ref".red)
    console.log(err)
  })
}

async function addEventToUser(useruid, eventuid, date, name){
  await database.ref('users/' + useruid + '/events').child(eventuid).child("date").set(date)
  .then(() => {
    console.log("Event added to user".green)
  }).catch(err => {
    console.log("Unable to add event ".red + eventuid.red + " to " + useruid.red);
    console.log(err);
  })
  await database.ref('users/' + useruid + "/events/" + eventuid).child("name").set(name).then(() => {})
  .catch(err => {
    console.log("Error adding name to the event ref in the user")
    console.log(err);
  })
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

async function getTeamEventHolders(teamuid){
  const teamEventHoldersRef = database.ref("teams/" + teamuid.toString() + "/eventholders");
  let eventHolders = {};

  await teamEventHoldersRef.once("value").then(async (snapshot) => {
    let eventHArray = [];
    snapshot.forEach(function(child) {
      eventHArray.push(child);
    });

    for(const eH of eventHArray){
      const value = eH.key;
      await database.ref("eventholders/" + value).once("value").then( eHSnapshot => {
        eventHolders[value] = eHSnapshot.val();
      }).catch(err => {
        console.log("Error in getTeamEventHolders - database".red)
        console.log(err);
      })
    }
  }).catch(err => {
    console.log("Error in getTeamEventHolders".red)
    console.log(err);
  })
  return eventHolders;
}

async function getHolderEvents(holderuid){
  const holderEvents = database.ref("eventholders/" + holderuid + "/events");

  let events = {}

  await holderEvents.once("value").then(async (snapshot) => {
    let eventArray = [];
    snapshot.forEach(function(child) {
      eventArray.push(child)
    })
    for(const event of eventArray){
      const value = event.key;
      await database.ref("events/" + value).once("value").then( eventSnapshot => {
        events[value] = eventSnapshot.val();
      }).catch(err => {
        console.log("Error in getHolderEvents".red)
        console.log(err);
      })
    }
  }).catch(err => {
    console.log("Error in getHolderEvents".red)
    console.log(err)
  })
  console.log(events);
  return events;
}

async function addRunnerToEvent(eventuid, runnerUidArray, date){
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
        database.ref("runners/" + runner + "/events/" + eventuid).child("date").set(date).then(() => {
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
  const priorMedianEventV02 = 0;
  const priorMedianEventWPace = 0;
  if(vValues !== undefined){
    priorMedianEventV02 = median(vValues);
  }
  if(wPValues !== undefined){
    priorMedianEventWPace = secondsToMinutes(median(wPValues));
  }
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
  // timeData.distance and timeData.units to find totalMileage
  
  const eventTimeRef = await database.ref("events/" + eventuid + "/runners/" + runneruid + "/time")
  const eventSplitRef = await database.ref("events/" + eventuid + "/runners/" + runneruid + "/splits")
  const runnerV02Ref = await database.ref("runners/" + runneruid + "/v02History");
  const runnerWPaceRef = await database.ref("runners/" + runneruid + "/wPaceHistory");
  await eventTimeRef.set(timeData).catch((error) => {
    console.log(error);
  });
  if(splitData.splits){
    await eventSplitRef.set(splitData.splits).catch((error) => {
      console.log(error);
    });
  }
  await database.ref("events/" + eventuid + "/runners/" + runneruid).child("raceV02").set(raceV02).then(() => {
  }).catch(() => {
    console.log("Error changing the raceV02 for the runner ".red + runneruid.red)
  })
  await database.ref("events/" + eventuid + "/runners/" + runneruid).child("raceWPace").set(raceWPace).then(() => {
  }).catch(() => {
    console.log("Error changing the raceV02 for the runner ".red + runneruid.red)
  })

  await runnerV02Ref.child(date).child("values").child("" + eventuid + runneruid).set(raceV02).then(async function() {
    await runnerUtilities.medianV02Values(date, runneruid)
  }).catch(err => { 
    console.log("Error updating the runner's v02History" + err)
  })

  await runnerWPaceRef.child(date).child("values").child("" + eventuid + runneruid).set(raceWPace).then(async function(){ // instead of the date put the eventUID
    await runnerUtilities.medianWPaceValues(date, runneruid)
    getPostRaceData(eventuid, selectedteamuid, date)
  }).catch(err => {
    console.log("Error updating the runner's wPaceHistory" + err)
  })

  const totalDistance = getDistance2(timeData.distance, timeData.units)
  await teamUtilities.updateTeamMileageHistory_Event(date, selectedteamuid, runneruid, eventuid, totalDistance);
  await database.ref("runners/" + runneruid + "/events/" + eventuid).child("mileage").set(totalDistance)
  .then(() => {
    console.log("Successfully updated the runner's event mileage".green);
  }).catch(err => {
    console.log("Un-Successfully updated the runner's event mileage".red);
    console.log(err);
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

  teamUtilities.getTeamV02(teamUID, date);
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

// ------------ See V02max in the client for more information ---------------
function getDistance2(measurement, unit){
  if(unit === 'Kilometers'){
      return convertKToM(measurement)
  } else if(unit === 'Meters'){
      return convertMeToMi(measurement)
  } else {
      if(typeof(measurement) !== "number"){
          const toReturn = Number(measurement);
          return toReturn;
      }
      return measurement
  }
}

module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;
module.exports.addRunnerToEvent = addRunnerToEvent;
module.exports.removeRunnerFromEvent = removeRunnerFromEvent;
module.exports.newTime = newTime;
module.exports.getEventPriorData = getEventPriorData;
module.exports.refreshEvent = refreshEvent;
module.exports.createEventHolder1 = createEventHolder1;
module.exports.createEventHolder2 = createEventHolder2;
module.exports.getTeamEventHolders = getTeamEventHolders;
module.exports.getHolderEvents = getHolderEvents;