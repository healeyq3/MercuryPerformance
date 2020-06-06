const express = require("express");
const router = express.Router();
const colors = require("colors");
const { createUser,  authenticateToken } = require("./firebaseUtils");

router.post('/', (req, res) => {
    authenticateToken(req.body.idToken).then((decodedIdToken) => {
        console.log("Successfully authenticated ".green + decodedIdToken.email.cyan)
        req.session.idToken = req.body.idToken;
        req.session.useruid = decodedIdToken.uid;
        res.end(/*teams?*/);
    }).catch((error) => {
        console.log("Firebase failed to authenticate a user id token".red);
        console.log(error);
        res.end();
    })
});

router.post('/new', (req, res) => {
    req.session.idToken = req.body.idToken;
    req.session.user = req.body.user;

    console.log(req.session.idToken);
    console.log(req.body.name);
    console.log("User ID: " + req.session.user.uid);

    const name = req.body.name;
    const email = req.body.email;
    const uid = req.session.user.uid;

    createUser(uid, name, email).then(() => res.end());

    console.log("Created account with token ".yellow + req.session.idToken.blue);
});

module.exports = router;
