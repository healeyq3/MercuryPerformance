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
router.post('/workouts', getWorkouts);
router.post('/newworkout', newWorkout);
router.post('/addrunner', addRunner);
router.post('/updateblueprint', updateBlueprint);
router.post('/atimes', sendATimes);

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
    const totalSeconds = data.blueprintData.totalSeconds;
    const totalDistance = data.blueprintData.totalDistance;

    workoutUtilities.createBlueprint(req.session.useruid, data.selectedTeamUID, name, reps, totalSeconds, totalDistance).then(blueprint => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(blueprint));
    }).catch(err => {
      console.log("Error adding and fetching the new blueprint".red);
      console.log(err);
      res.end("{}");
    })
}

async function updateBlueprint(req, res){
    console.log("Got to update backend");
    if(!await authenticatePost(req, res)){
        res.end("{}")
        return;
    }

    if(!await teamUtilities.doesUserOwnTeam(req)){
        res.end("{}")
        return;
    }

    const data = req.body;
    const name = data.blueprintData.name;
    const reps = data.blueprintData.reps;
    let workouts = {}
    if(data.blueprintData.workouts !== undefined){
        workouts = data.blueprintData.workouts
    }
    const blueprintuid = data.blueprintData.blueprintuid;

    workoutUtilities.updateBlueprint(name, reps, workouts, blueprintuid).then(blueprint => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(blueprint));
    }) .catch(err => {
        console.log("Error updating and fetching the new blueprint".red);
        console.log(err);
        res.end('{}');
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

async function newWorkout(req, res){
    if(!await authenticatePost(req, res)){
        res.end("{}");
        return;
    }

    if(!await teamUtilities.doesUserOwnTeam(req)){
        res.end("{}");
        return;
    }

    const data = req.body;
    const date = data.workoutData.date;
    const reps = data.workoutData.reps;
    const blueprint = data.workoutData.blueprint

    
    workoutUtilities.createWorkout(req.session.useruid, data.selectedTeamUID, blueprint, date, reps).then(workout => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(workout));
    }).catch(err => {
      console.log("Error adding and fetching the new workout".red);
      console.log(err);
      res.end("{}");
    })
}

async function getWorkouts(req, res){
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

    workoutUtilities.getWorkouts(data.selectedTeamUID, data.blueprint).then((workouts) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(workouts));
    }).catch(err => {
        console.log(err);
        res.end('{}');
    });
}

async function addRunner(req, res){
    if(!await authenticatePost(req, res)){
      res.end();
      return;
    }
  
    const data = req.body;
    const runnerUidArray = data.runnerUidArray;
    const workoutuid = data.workoutuid;
  
    const runnersAdded = await workoutUtilities.addRunnerToWorkout(workoutuid, runnerUidArray);
    res.end(JSON.stringify({
        runnersAdded: runnersAdded,
        workoutuid: workoutuid
      })
    );
  }

async function sendATimes(req, res){
    if(!await authenticatePost(req, res)){
        res.end();
        return;
    }
    const data = req.body;
    const aTimes = data.aTimesArray;
    const workoutuid = data.workoutuid;
    const runneruid = data.runneruid

    const aTimesObj = {
        aTimes,
        workoutuid,
        runneruid
    }
    console.log("About to send aTimes to databse")
    workoutUtilities.sendATimes(aTimes, workoutuid, runneruid).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(aTimesObj))
    }).catch(err => {
        console.log(err);
        res.end('{}')
    })
}