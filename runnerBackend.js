const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("./firebaseUtils");

router.post('/', async (req, res) => {
  console.log("Received request");
  let authenticationSuccess = true;
  await firebaseUtils.authenticatePost(req, res).then((success) => {
    authenticationSuccess = success;
  })
  if(!authenticationSuccess){
    res.end("{}");
    return;
  }

  new Promise((resolve) => {
    setTimeout(() => resolve(""), 5000);
  })

  res.end();
});

module.exports = router;
