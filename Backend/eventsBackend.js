const express = require("express");
const router = express.Router();
const colors = require("colors");
const firebaseUtils = require("../firebaseUtils");

router.post('/', async (req, res) => {
    let authenticationSuccess = true;
    await firebaseUtils.authenticatePost(req, res).then((success) => {
      authenticationSuccess = success;
    })
    if(!authenticationSuccess){
      res.end();
      return;
    }
  
    const data = req.body;
  
    firebaseUtils.getTeamRunners(data.teamUID).then((runners) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(runners));
    }).catch((error) => {
      console.log(error);
      res.end("{}");
    });
  });


  router.post('/new', async (req, res) => {
    let authenticationSuccess = true;
    await firebaseUtils.authenticatePost(req, res).then((success) => {
      authenticationSuccess = success;
    })
    if(!authenticationSuccess){
      res.end();
      return;
    }
  
    const data = req.body;
    const name = data.eventData.name;
    const date = data.eventData.date;
    const location = data.eventData.location;
  
    firebaseUtils.createRunner(data.selectedTeamUID, name, date, location).then((runners) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(runners));
    }).catch((error) => {
      console.log("Error adding and fetching Runners".red);
      console.log(error);
      res.end("{}");
    })
  });