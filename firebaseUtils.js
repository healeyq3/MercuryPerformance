const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mercury-1875e.firebaseio.com"
});
const database = admin.database();

async function authenticateToken(idToken){
    return await admin.auth().verifyIdToken(idToken);
}

// -------------- USER ----------------

async function createUser(uID, name, email){
    await database.ref("users").child(uID.toString()).set({
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

async function createTeam(user, teamName, teamYear, teamLevel){
    console.log("Creating team".red);

    const teamRef = await database.ref("teams").push();
    
    const newTeam = {
        teamName: teamName,
        coach: user.uid,
        year: teamYear,
        level: teamLevel,
        key: teamRef.key.toString()
    }

    
    await teamRef.set(newTeam).then(async () => {
        console.log("Successfully created team ".red + teamName.blue);
        await addTeamToUser(user, teamRef.key, "coach");
    }).catch((err) => {
        console.log("Unable to create team ".red + teamName.blue);
        console.log(err.toString());
    });

    getUserTeams(user).then(() => {
        return teams;
    });
}

async function addTeamToUser(user, teamUid, role){
    await database.ref("users/" + user.uid.toString() + "/teams").child(teamUid.toString()).set({
        role : role
    }).then(() => {
        console.log("Successfully added team ".red + teamUid.red +" to ".red + user.uid.toString().blue);
    }).catch((err) => {
        console.log("Unable to add team ".red + teamUid.red +" to ".red + user.uid.toString().blue);
        console.log(err);
    });
}

async function getUserTeams(user){
    const teamsRef = database.ref("users/"+user.uid+"/teams");
    let teams = {};
    await teamsRef.once("value", function (snapshot) {
        snapshot.forEach(function(child) {
            const value = child.key;
            database.ref("teams/" + value).on("value", teamSnapshot => {
                teams[value] = teamSnapshot.val();
            });
        });
    });

    return teams;
}

// -------------- Runners ----------------

async function getTeamRunners(teamUID){
    console.log(teamUID);
    const teamRunnersRef = database.ref("teams/" + teamUID + "/runners");
    let runners = {};
    await teamRunnersRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            runners[childSnapshot.val()] = {};
        });
    });

    for (const runnerUid of Object.keys(runners)) {
        const runnerRef = database.ref("runners/" + runnerUid);

        await runnerRef.once("value", async function (snapshot) {
            runners[runnerUid] = await snapshot.val();
        });
    }

    return runners;
}

async function authenticatePost(req, res){
    if(req.body.idToken == null || !await authenticateToken(req.body.idToken) || req.body.idToken !== req.session.idToken){
        res.end();
        console.log("Post Request Denied".red);
        return false;
    }
    return true;
}

async function createRunner(teamUID, name, email, experience, gradYear, wPace, v02){
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
    
    await runnerRef.set(newRunner).then(async () => {
        console.log("Successfully created Runner ".red + name.blue);
        await addRunnerToTeam(teamUID, runnerRef.key);
    }).catch((err) => {
        console.log("Unable to create runner ".red + name.blue);
        console.log(err.toString());
    });

    return newRunner;
}

async function addRunnerToTeam(teamUid, runnerUID){
    console.log(`teamuid: ${teamUid}`);
    console.log(runnerUID);
    await database.ref("teams/" + teamUid + "/runners").child(runnerUID.toString()).set(runnerUID)
    .then(() => {
        console.log("Successfully added runner ".red + runnerUID.red +" to ".red);
    }).catch((err) => {
        console.log("Unable to add runner ".red + runnerUID.red +" to ".red);
        console.log(err);
    });
}

// -------------- Events ----------------

async function createEvent(teamUid, name, date, location){
    console.log("creating event in Firebase Utils")
    const eventRef = await database.ref("events").push();
    console.log(eventRef);

    const eventData = {
        name,
        date,
        location,
        key: eventRef.key.toString()
    }


    await eventRef.set(eventData).then(async () => {
        console.log("Successfully created Event ".red + name.blue);
        await addEventToTeam(teamUid, eventRef.key);
    }).catch((err) => {
        console.log("Unable to create event ".red + name.blue);
        console.log(err.toString());
    });

    getTeamEvents(teamUid).then((events) => {
        return events;
    });

}

async function addEventToTeam(teamUid, eventUID){
    console.log(`teamuid: ${teamUid}`);
    console.log(eventUID);
    await database.ref("teams/" + teamUid + "/events").child(eventUID.toString()).set(eventUID)
    .then(() => {
        console.log("Successfully added event ".red + eventUID.red +" to ".red + teamUid.red);
    }).catch((err) => {
        console.log("Unable to add event ".red + eventUID.red +" to ".red);
        console.log(err);
    });
}

async function getTeamEvents(teamUID){
    console.log(teamUID);
    const teamEventsRef = database.ref("teams/" + teamUID + "/events");
    let events = {};
    await teamEventsRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            events[childSnapshot.val()] = {};
        });
    });

    for (const eventUid of Object.keys(events)) {
        const eventsRef = database.ref("events/" + eventUid);

        await eventsRef.once("value", async function (snapshot) {
            events[eventUid] = await snapshot.val();
        });
    }

    return eventUid;
}



module.exports.createUser = createUser;
module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.authenticatePost = authenticatePost;
module.exports.createRunner = createRunner;
module.exports.getTeamRunners = getTeamRunners;
module.exports.addRunnerToTeam = addRunnerToTeam;
module.exports.createEvent = createEvent;
module.exports.addEventToTeam = addEventToTeam;
module.exports.getTeamEvents = getTeamEvents;