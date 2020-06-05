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

    
    teamRef.set(newTeam).then(() => {
        console.log("Successfully created team ".red + teamName.blue);
        addTeamToUser(user, teamRef.key, "coach");
    }).catch((err) => {
        console.log("Unable to create team ".red + teamName.blue);
        console.log(err.toString());
    });

    return newTeam;
}

async function addTeamToUser(user, teamUid, role){
    database.ref("users/" + user.uid.toString() + "/teams").child(teamUid.toString()).set({
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

async function getTeamRunners(teamUID){
    const startTime = Date.now();
    console.log("Starting getRunners execution");
    const teamRunnersRef = database.ref("teams/" + teamUID + "/runners");
    let runners = {};

    console.log("Reference received - ".cyan +(Date.now()-startTime));

    await teamRunnersRef.once("value", function (snapshot) {
        console.log("Inside once - ".cyan +(Date.now()-startTime));
        snapshot.forEach(function (childSnapshot) {
            runners[childSnapshot.val()] = {};
        });
        console.log("Finished getting runners - ".cyan +(Date.now()-startTime));
    });

    for (const runnerUid of Object.keys(runners)) {
        const runnerRef = database.ref("runners/" + runnerUid);

        runnerRef.once("value", function (snapshot) {
            runners[runnerUid] = snapshot.val();
        });
        console.log("Done with runner ".cyan +(Date.now()-startTime));
    }

    console.log("Done getting detailed runner info - ".cyan +(Date.now()-startTime));

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
    
    runnerRef.set(newRunner).then(() => {
        console.log("Successfully created Runner ".red + name.blue);
        addRunnerToTeam(teamUID, runnerRef.key);
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

module.exports.createUser = createUser;
module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.authenticatePost = authenticatePost;
module.exports.createRunner = createRunner;
module.exports.getTeamRunners = getTeamRunners;
module.exports.addRunnerToTeam = addRunnerToTeam;