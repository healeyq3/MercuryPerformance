const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("./firebaseUtils");

router.post('/',async (req, res) => {
  console.log("Received request");
  let authenticationSuccess = true;
  await firebaseUtils.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end("{}");
    return;
  }
  const data = req.body;
  console.log("Runner: ".red + data.teamUID)
  firebaseUtils.getTeamRunners(data.teamUID).then((runners) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(runners));
  }).catch((error) => {
    console.log(error);
    res.end("{}");
  });
});

module.exports = router;
