const express = require('express');
const router = express.Router();
const colors = require('colors');
const workoutUtilities = require('../firebaseUtilities/workoutUtilities');
const { authenticatePost } = require('../firebaseUtilities/authenticationUtilities');
const teamUtilities = require('../firebaseUtilities/teamUtilities')

router.post('/blueprints', getBlueprints);
router.post('/getallblueprints', getAllBlueprints);
router.post('/newblueprint', newBlueprint);
router.post('/addblueprint', addBlueprint);

module.exports = router;

async function getBlueprints(req, res){
    if(!await authenticatePost(req, res)){
        res.end("{}");
        return;
    }
    
    const data = req.body;
    if(!await teamUtilities.doesUserOwnTeam(req)){
        console.log("User does not own team they tried to access".red);
        res.end("{}");
        return;
    }

    workoutUtilities.getBlueprints(data.selectedTeamUID).then((blueprints) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(blueprints));
    }).catch(err => {
        console.log(err);
        res.end('{}');
    });
}

async function getAllBlueprints(req, res){
  if(!await authenticatePost(req, res)){
      res.end("{}");
    return;
  }

  workoutUtilities.getAllBlueprints(req.session.useruid).then((blueprints) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(blueprints));
  }).catch(err => {
    console.log(err);
    res.end('{}');
  });
}

async function newBlueprint(req, res){
    if(!await authenticatePost(req, res)){
        res.end("{}");
        return;
    }

    if(!await teamUtilities.doesUserOwnTeam(req)){
        res.end("{}");
        return;
    }

    const data = req.body;
    const name = data.blueprintData.name;
    const reps = data.blueprintData.reps;

    workoutUtilities.createBlueprint(req.session.useruid, data.selectedTeamUID, name, reps).then(blueprint => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(blueprint));
    }).catch(err => {
      console.log("Error adding and fetching the new blueprint".red);
      console.log(err);
      res.end("{}");
    })
}

async function addBlueprint(req, res){
    if(!await authenticatePost(req, res)){
        res.end("{}");
        return;
    }

    if(!await teamUtilities.doesUserOwnTeam(req)){
        res.end("{}");
        return;
    }

    if(!req.body.selectedTeamUID || !req.body.blueprintuid){
        res.end("{}");
        return;
    }

    workoutUtilities.addBlueprintToTeam(req.body.selectedTeamUID, req.body.blueprintuid);
    const toSend = JSON.stringify({
        teamuid: req.body.selectedTeamUID, blueprintuid: req.body.blueprintuid
    });
    res.end(toSend);
}