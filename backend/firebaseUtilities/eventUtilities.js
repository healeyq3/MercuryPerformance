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

async function addRunnerToEvent(eventuid, runneruid, data){
  console.log("Adding runner".green + "(".cyan + runneruid.cyan + ")".cyan + " to team".green + "(".cyan + eventuid.cyan + ")".cyan);
  const runnersRef = database.ref("runners/"+runneruid);

  await runnersRef.once("value").then((snapshot) => {
    //Check if the runner exists - if not, return false
    if(!snapshot.hasChild("email")){
      return false;
    }

    database.ref("events/"+eventuid+"/runners/"+runneruid).set(data).then(() =>{
      console.log("Successfully added runner ".cyan + runneruid + " to ".cyan + eventuid);
      return true;
    }).catch((error) => {
      console.log("Adding runner to event ".red + eventuid + " failed.".red);
      console.log(error);
    })
  })
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