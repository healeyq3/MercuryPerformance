import { database } from "./firebaseSetup";

// -------------- USER ----------------

export async function createUser(useruid, name, email){
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