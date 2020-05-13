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

async function createTeam(user, teamName, teamYear, teamLevel, teamFormula){
    database.ref("teams").push({
        teamName: teamName,
        coach: user.uid,
        year: teamYear,
        level: teamLevel,
        formula: teamFormula
    }).then((snapshot) => {
        console.log("Successfully created team ".red + teamName.blue);
        addTeamToUser(user, snapshot.key, "coach");
    }).catch((err) => {
        console.log("Unable to create team ".red + teamName.blue);
        console.log(err.toString());
    });
}

async function addTeamToUser(user, teamUid, role){
    await database.ref("users/" + user.uid.toString() + "/teams").child(teamUid).set({
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

module.exports.createUser = createUser;
module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.authenticateToken = authenticateToken;