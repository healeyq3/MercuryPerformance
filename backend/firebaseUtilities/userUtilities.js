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

module.exports.createUser = createUser;