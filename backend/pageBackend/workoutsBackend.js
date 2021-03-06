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
router.post('/statistics', updateWorkoutStats);

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
    const totalSeconds = data.blueprintData.totalSeconds;
    const totalDistance = data.blueprintData.totalDistance;
    let workouts = {}
    if(data.blueprintData.workouts !== undefined){
        workouts = data.blueprintData.workouts
    }
    const blueprintuid = data.blueprintData.blueprintuid;

    workoutUtilities.updateBlueprint(name, reps, workouts, blueprintuid, totalSeconds, totalDistance).then(blueprint => {
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
    const blueprint = data.workoutData.blueprint;
    const name = data.workoutData.name;

    
    workoutUtilities.createWorkout(req.session.useruid, data.selectedTeamUID, blueprint, date, reps, name).then(workout => {
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
    const date = data.date;
  
    const runnersAdded = await workoutUtilities.addRunnerToWorkout(workoutuid, runnerUidArray, date);
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
    const runneruid = data.runneruid;
    const aETimes = data.aETimesArray;
    const workoutStats = data.workoutStats
    const date = data.date;
    const team = data.selectedTeam;

    const aTimesObj = {
        aTimes,
        workoutuid,
        runneruid,
        aETimes,
        workoutStats
    }
    console.log("About to send aTimes to databse")
    workoutUtilities.sendATimes(aTimes, aETimes, workoutStats, workoutuid, runneruid, date, team).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(aTimesObj))
    }).catch(err => {
        console.log(err);
        res.end('{}')
    })
}

async function updateWorkoutStats(req, res){
    if(!await authenticatePost(req,res)) {
        res.end();
        return;
    }

    const data = req.body;
    const statistics = data.statistics;
    const workoutuid = data.workoutuid;

    workoutUtilities.updateWorkoutStats(statistics, workoutuid).then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            statistics : statistics,
            workoutuid : workoutuid
        })
        )
    }).catch(err => {
        console.log('Error updating the workouts overal stats'.red);
        console.log(err);
    })

}