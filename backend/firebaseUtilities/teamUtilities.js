const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;
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
  return teams;
}

async function doesUserOwnTeam(req){
  const useruid = req.session.useruid;
  const teamuid = req.body.selectedTeamUID;

  if(!teamuid){
    console.log("teamuid not passed - returning null".red);
    return false;
  }
  const teamRef = database.ref("users/"+useruid+"/teams");
  return teamRef.once("value").then((snapshot) => {
    return snapshot.hasChild(teamuid);
  });
}

module.exports.createTeam = createTeam;
module.exports.addTeamToUser = addTeamToUser;
module.exports.getUserTeams = getUserTeams;
module.exports.doesUserOwnTeam = doesUserOwnTeam;