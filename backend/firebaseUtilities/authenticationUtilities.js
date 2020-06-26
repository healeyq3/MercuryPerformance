const admin = require("firebase-admin");

async function authenticateToken(idToken){
  return await admin.auth().verifyIdToken(idToken);
}

async function authenticatePost(req, res){
  return authenticateToken(req.body.idToken).then((decodedIdToken) => {
    return true;
  }).catch((error) => {
    res.end("{}");
    console.log("Authentication failed for user token".red);
    console.log(error.toString().substr(0,150));
    return false;
  });
}

module.exports.authenticateToken = authenticateToken;
module.exports.authenticatePost = authenticatePost;