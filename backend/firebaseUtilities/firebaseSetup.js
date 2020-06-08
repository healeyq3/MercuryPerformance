const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mercury-1875e.firebaseio.com"
});

const database = admin.database();

//Firebase Primer Setup
const startTime = Date.now();
database.ref("/").on("value", snapshot => {
    snapshot.val();
});
console.log("Finished primer after ".green + (Date.now() - startTime).toString().cyan + "ms".cyan);

module.exports = {
    database: database
};