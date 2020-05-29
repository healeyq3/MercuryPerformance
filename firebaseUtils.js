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

async function authenticatePost(req, res){
    if(req.body.idToken == null || !await authenticateToken(req.body.idToken) || req.body.idToken !== req.session.idToken){
        res.end();
        console.log("Post Request Denied".red);
        return false;
    }
    return true;
}

async function createRunner(user, teamUID, name, email, experience, gradYear, wPace){
    console.log("Creating Runner".red);

    const runnerRef = await database.ref("teams").push();
    
    const newTeam = {
        name,
        email,
        experience,
        gradYear,
        wPace,
        key: runnerRef.key.toString()
    }

    
    await runnerRef.set(newRunner).then(async () => {
        console.log("Successfully created Runner ".red + name.blue);
        await addRunnerToTeam(user, teamUID, runnerRef.key);
    }).catch((err) => {
        console.log("Unable to create team ".red + teamName.blue);
        console.log(err.toString());
    });

    getTeamRunners(user).then(() => {
        return runners;
    });
}

async function addRunnerToTeam(user, teamUid, runnerUID){
    await database.ref("users/" + user.uid.toString() + "/teams/runners").child(runnerUID.toString())
    .then(() => {
        console.log("Successfully added runner ".red + runnerUID.red +" to ".red + user.uid.toString().blue);
    }).catch((err) => {
        console.log("Unable to add runner ".red + runnerUID.red +" to ".red + user.uid.toString().blue);
        console.log(err);
    });
}

async function getTeamRunners(user, teamUID){
    const runnersRef = database.ref("users/"+user.uid+"/teams/"+teamUID+"/runners");
    let runners = {};
    await runnersRef.once("value", function (snapshot) {
        snapshot.forEach(function(child) {
            const value = child.key;
            database.ref("runners/" + value).on("value", runnerSnapshot => {
                runners[value] = runnerSnapshot.val();
            });
        });
    });

    return runners;
}

module.exports.createUser = createUser;
module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.authenticatePost = authenticatePost;
module.exports.createRunner = createRunner;
module.exports.getTeamRunners = getTeamRunners;
module.exports.addRunnerToTeam = addRunnerToTeam;