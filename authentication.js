const express = require("express");
const router = express.Router();
const colors = require("colors");
const {createUser} = require("./firebaseUtils");

router.post('/', (req, res) => {
    req.session.idToken = req.body.idToken;
    res.end();

    console.log("User logged in with token ".cyan + req.session.idToken.blue);
});

router.post('/new', (req, res) => {
    req.session.idToken = req.body.idToken;

    const name = req.body.name;
    const email = req.body.email;
    const uID = req.body.uID;

    createUser(uID, name, email).then(() => res.end());

    console.log("Created account with token ".yellow + req.session.idToken.blue);
});

module.exports = router;
