const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mercury-1875e.firebaseio.com"
});
const database = admin.database();

//Firebase Primer Setup
const startTime = Date.now();
console.log("Running primer");
database.ref("/").on("value", snapshot => {
    snapshot.val();
});
console.log("Finished primer after ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);

async function authenticateToken(idToken){
    return await admin.auth().verifyIdToken(idToken);
}

async function authenticatePost(req, res){
    return authenticateToken(req.body.idToken).then((decodedIdToken) => {
        req.session.idToken = req.body.idToken;
        req.session.useruid = decodedIdToken.uid;
        return true;
    }).catch((error) => {
        res.end("{}");
        console.log("Authentication failed for user token".red);
        console.log(error);
        return false;
    });
}


// -------------- USER ----------------

async function createUser(useruid, name, email){
    await database.ref("users").child(useruid.toString()).set({
    name: name,
    email: email,
    teams: []
}).then(() => {
    console.log("Successfully created user with email ".red + email.blue);
}).catch((err) => {
    console.log("Unable to create user with email ".red+email.blue);
    console.log(err.toString().red);
});
}

// -------------- Team ----------------

async function createTeam(useruid, teamName, teamYear, teamLevel){
    console.log("Creating team ".red + teamName.green);

    const teamRef = await database.ref("teams").push();
    
    const newTeam = {
        teamName: teamName,
        coach: useruid,
        year: teamYear,
        level: teamLevel,
        key: teamRef.key.toString()
    }

    
    teamRef.set(newTeam).then(() => {
        console.log("Successfully created team ".red + teamName.blue);
        addTeamToUser(useruid, teamRef.key, "coach");
    }).catch((err) => {
        console.log("Unable to create team ".red + teamName.blue);
        console.log(err.toString());
    });

    return newTeam;
}

async function addTeamToUser(useruid, teamuid, role){
    database.ref("users/" + useruid + "/teams").child(teamuid.toString()).set({
        role : role
    }).then(() => {
        console.log("Successfully added team ".red + teamuid.red +" to ".red + useruid.blue);
    }).catch((err) => {
        console.log("Unable to add team ".red + teamuid.red +" to ".red + useruid.blue);
        console.log(err);
    });
}

async function getUserTeams(useruid){
    const startTime = Date.now();
    const teamsRef = database.ref("users/"+useruid+"/teams");
    let teams = {};
    await teamsRef.once("value").then(async (snapshot) => {
        let teamArray = [];
        snapshot.forEach(function(child) {
            teamArray.push(child);
        });
        for (const team of teamArray){
            const value = team.key;
            await database.ref("teams/" + value).once("value").then((teamSnapshot) => {
                teams[value] = teamSnapshot.val();
            });
        }
    });

    console.log("Finished Get Teams - ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
    return teams;
}


async function doesUserOwnTeam(useruid, teamuid){
    if(!teamuid){
        console.log("teamuid not passed for events - returning null".red);
        return false;
    }
    const teamRef = database.ref("users/"+useruid+"/teams");
    return teamRef.once("value").then((snapshot) => {
       return snapshot.hasChild(teamuid);
    });
}

// -------------- Runners ----------------

async function getTeamRunners(teamuid){
    const startTime = Date.now();
    const teamRunnersRef = database.ref("teams/" + teamuid + "/runners");
    let runners = {};

    await teamRunnersRef.once("value").then(async (snapshot) => {
        let runnerArray = [];
        snapshot.forEach(function(child) {
            runnerArray.push(child);
        });

        for (const runner of runnerArray){
            const value = runner.key;
            await database.ref("runners/" + value).once("value").then((runnerSnapshot) => {
                runners[value] = runnerSnapshot.val();
            });
        }
    });

    console.log("Finished Get Runners - ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);
    return runners;
}

async function createRunner(teamuid, name, email, experience, gradYear, wPace, v02){
    console.log("Creating Runner".red);

    const runnerRef = await database.ref("runners").push();
    
    const newRunner = {
        name,
        email,
        experience,
        gradYear,
        wPace,
        v02,
        key: runnerRef.key.toString()
    }
    
    runnerRef.set(newRunner).then(() => {
        console.log("Successfully created Runner ".red + name.blue);
        addRunnerToTeam(teamuid, runnerRef.key);
    }).catch((err) => {
        console.log("Unable to create runner ".red + name.blue);
        console.log(err.toString());
    });

    return newRunner;
}

async function addRunnerToTeam(teamuid, runnerUID){
    await database.ref("teams/" + teamuid + "/runners").child(runnerUID.toString()).set(runnerUID)
    .then(() => {
        console.log("Successfully added runner ".red + runnerUID.red +" to ".red);
    }).catch((err) => {
        console.log("Unable to add runner ".red + runnerUID.red +" to ".red);
        console.log(err);
    });
}

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

async function addEventToTeam(teamuid, eventUID){
    await database.ref("teams/" + teamuid.toString() + "/events").child(eventUID.toString()).set(eventUID)
    .then(() => {
        console.log("Successfully added event ".red + eventUID.red +" to ".red + teamuid.toString().red);
    }).catch((err) => {
        console.log("Unable to add event ".red + eventUID.red +" to "+ teamuid.toString().red);
        console.log(err);
    });
}

async function getTeamEvents(teamUID){
    const startTime = Date.now();
    const teamEventsRef = database.ref("teams/" + teamUID.toString() + "/events");
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
    console.log(events);
    return events;
}

async function addRunnerToEvent(eventuid, runneruid, teamuid){
    console.log("Adding runner".green + "(".cyan + runneruid.cyan + ") to team".green + "(".cyan + teamuid.cyan + ")".cyan);
    const runnersRef = database.ref("runners/"+runneruid);

    await runnersRef.once("value").then((snapshot) => {
        //Check if the runner exists - if not, return false
        if(!snapshot.hasChild("email")){
            return false;
        }

        database.ref("events/"+eventuid+"/runners/"+runneruid).set(runneruid).then(() =>{
            console.log("Successfully added runner ".cyan + runneruid + " to ".cyan + teamuid);
            return true;
        }).catch((error) => {
            console.log("Adding runner to event ".red + eventuid + " failed.".red);
            console.log(error);
        })
    })
}

module.exports.authenticateToken = authenticateToken;
module.exports.createUser = createUser;
module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.doesUserOwnTeam = doesUserOwnTeam;
module.exports.authenticatePost = authenticatePost;
module.exports.createRunner = createRunner;
module.exports.getTeamRunners = getTeamRunners;
module.exports.addRunnerToTeam = addRunnerToTeam;
module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;