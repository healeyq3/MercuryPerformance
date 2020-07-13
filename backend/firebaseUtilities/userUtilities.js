const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;

// -------------- USER ----------------

async function createUser(useruid, name, email){
  await database.ref("users").child(useruid.toString()).set({
    name: name,
    email: email,
    teams: []
  }).catch((err) => {
    console.log("Unable to create user with email ".red+email.blue);
    console.log(err.toString().red);
  });
}

async function determineUserType(useruid){
  const mainUser = await database.ref("users");
  const runningUser = await database.ref("running user");
  if(mainUser[useruid]){
    return "coach";
  }
  if(runningUser[useruid]){
    return "runner";
  }
}

module.exports.createUser = createUser;
module.exports.determineUserType = determineUserType;