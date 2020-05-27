const express = require("express");
const router = express.Router();
const colors = require("colors");
const { createUser, getUserTeams } = require("./firebaseUtils");

router.post('/', (req, res) => {
    req.session.idToken = req.body.idToken;
    req.session.user = req.body.user;
    res.end(JSON.stringify(getUserTeams(req.session.user)));

    console.log(req.session.user.email.blue + " logged in with token ".cyan + req.session.idToken.blue);
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
