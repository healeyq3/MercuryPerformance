const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mercury-1875e.firebaseio.com"
});

async function authenticateToken(idToken){
    return await admin.auth().verifyIdToken(idToken);
}

async function createUser(uID, name, email){
    const database = admin.database();

    await database.ref("users").child(uID.toString()).set({
        name: name,
        email: email
    }).then(() => {
        console.log("Successfully created user with email ".red + email.blue);
    }).catch((err) => {
        console.log("Unable to create user with email ".red+email.blue);
        console.log(err.toString().red);
    });
}

module.exports.createUser = createUser;
module.exports.authenticateToken = authenticateToken;