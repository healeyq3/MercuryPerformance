const express = require("express");
const router = express.Router();
const colors = require("colors");
const userUtilities = require("../firebaseUtilities/userUtilities");
const authenticationUtilities = require("../firebaseUtilities/authenticationUtilities");

router.post('/', loginAuthentication);
router.post('/new', createAccount);

module.exports = router;

async function loginAuthentication(req, res){
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    authenticationUtilities.authenticateToken(req.body.idToken).then((decodedIdToken) => {
        req.session.idToken = req.body.idToken;
        req.session.useruid = decodedIdToken.uid;
        res.end(/*teams?*/);
    }).catch((error) => {
        console.log("Firebase failed to authenticate a user id token".red);
        console.log(error);
        res.end();
    })
}

async function createAccount(req, res){
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    authenticationUtilities.authenticateToken(req.body.idToken).then((decodedIdToken) => {
        req.session.idToken = req.body.idToken;
        req.session.useruid = decodedIdToken.uid;

        const name = req.body.name;
        const email = req.body.email;
        const uid = req.session.useruid;

        userUtilities.createUser(uid, name, email);
        res.end()
    }).catch((error) => {
        console.log("Firebase failed to authenticate new user with id token".red);
        console.log(error);
        res.end();
    })
}
