const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;

// -------------- Events ----------------

async function createEvent(teamuid, name, date, location){
  const eventRef = await database.ref("events").push();

  const eventData = {
    name,
    date,
    location,
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

function addRunnerToEvent(eventuid, runnerUidArray){
  console.log(runnerUidArray);
  console.log(eventuid);
  // console.log("Adding runners".green + "(".cyan + runnerUidArray.toString().cyan + ")".cyan + " to team".green + "(".cyan + eventuid.cyan + ")".cyan);

  const eventRef = database.ref("events/" + eventuid + "/runners");
  runnerUidArray.forEach((runneruid) => {
    if (!eventRef.hasOwnProperty("" + runneruid)) {
      console.log("runneruid: " + runneruid);
      eventRef.child("" + runneruid).set({ runneruid: runneruid }).then(() => {
        console.log("Successfully added runner ".cyan + runneruid + " to ".cyan + eventuid);
      }).catch(() => {
        console.log("Error adding runner ".cyan + runneruid + " to ".cyan + eventuid);
      })
    }
  });
}
function newTime(timeData, eventuid, runneruid){
  console.log(timeData);
  console.log(eventuid);
  // console.log("Adding runners".green + "(".cyan + runnerUidArray.toString().cyan + ")".cyan + " to team".green + "(".cyan + eventuid.cyan + ")".cyan);

  const eventRef = database.ref("events/" + eventuid + "/" + runneruid + "/times").child(timeData.key).set(timeData);
  
  //await database.ref("teams/" + teamuid.toString() + "/events" + eventuid + "/" + runneruid).child(eventuid.toString()).set(eventuid)
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

module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;
module.exports.addRunnerToEvent = addRunnerToEvent;
module.exports.removeRunnerFromEvent = removeRunnerFromEvent;
module.exports.newTime = newTime;