const admin = require("firebase-admin");

async function authenticateToken(idToken){
  return await admin.auth().verifyIdToken(idToken);
}

async function authenticatePost(req, res){
  return authenticateToken(req.body.idToken).then((decodedIdToken) => {
    req.session.idToken = req.body.idToken;
    req.session.useruid = decodedIdToken.uid;
    return true;
  }).catch((error) => {
    res.end("{}");
    console.log("Authentication failed for user token".red);
    console.log(error);
    return false;
  });
}

module.exports.authenticateToken = authenticateToken;
module.exports.authenticatePost = authenticatePost;