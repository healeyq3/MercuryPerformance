const firebaseSetup = require('./firebaseSetup');
const database = firebaseSetup.database;


// -------------- Workouts ----------------
async function getBlueprints(teamuid) {
    const teamBlueprintsRef = await database.ref('teams/' + teamuid.toString() + '/blueprints');
    let blueprints = {};

    await teamBlueprintsRef.once('value').then(async (snapshot) => {
        let blueprintsArray = [];
        snapshot.forEach(function(child) {
            blueprintsArray.push(child);
        });

        for(const blueprint of blueprintsArray){
            const value = blueprint.key;
            await database.ref('blueprints/' + value).once('value').then(blueprintSnapshot => {
                blueprints[value] = blueprintSnapshot.val();
            }).catch(err => {
                console.log(`Error in getBlueprints - database ref blueprints/val`.red);
                console.log(err);
            })
        }
    }).catch(err => {
        console.log('Error in getBlueprints'.red);
        console.log(err);
    })

    return blueprints;
}

async function getAllBlueprints(useruid) {
    const userBlueprintsRef = await database.ref('users/' + useruid + '/blueprints');
    let blueprints = {};

    await userBlueprintsRef.once('value').then(async (snapshot) => {
        let blueprintsArray = [];
        snapshot.forEach(function(child) {
            blueprintsArray.push(child);
        });

        for(const blueprint of blueprintsArray){
            const value = blueprint.key;
            await database.ref('blueprints/' + value).once('value').then(blueprintSnapshot => {
                blueprints[value] = blueprintSnapshot.val();
            }).catch(err => {
                console.log(`Error in getAllBlueprints - database ref blueprints/val`.red);
                console.log(err);
            })
        }
    }).catch(err => {
        console.log('Error in getBlueprints'.red);
        console.log(err);
    })

    return blueprints;
}

async function createBlueprint(useruid, teamuid, name, reps){
    const blueprintRef = await database.ref('blueprints').push();

    const blueprintData = {
        name,
        reps,
        key: blueprintRef.key.toString()
    }

    blueprintRef.set(blueprintData).then(async () => {
        addBlueprintToTeam(teamuid, blueprintRef.key)
        addBlueprintToUser(useruid, blueprintRef.key);
    }).catch(err => {
        console.log('Unable to create blueprint'.red + name.blue);
        console.log(err.toString());
    });

    return blueprintData;
}

async function updateBlueprint(name, reps, workouts, blueprintuid){
    const blueprintRef = await database.ref('blueprints/' + blueprintuid);

    const blueprintData = {
        name, 
        reps,
        workouts,
        key: blueprintuid
    }
    
    blueprintRef.set(blueprintData).then(async () => {
        console.log("Successfully updated blueprint data".green)
    }) .catch(err => {
        console.log("Unable to update blueprint".red + name.blue)
        console.log(err);
    })
    return blueprintData;
}

async function addBlueprintToTeam(teamuid, blueprintuid){
    await database.ref('teams/' + teamuid + '/blueprints').child(blueprintuid).set(blueprintuid)
    .then(() => {
    }).catch(err => {
        console.log("Unable to add blueprint ".red + blueprintuid.red + ' to '.red + teamuid.toString().red);
        console.log(err);
    })
}

async function addBlueprintToUser(useruid, blueprintuid){
    await database.ref('users/' + useruid + '/blueprints').child(blueprintuid).set(blueprintuid)
      .then(() => {
      }).catch(err => {
          console.log("Unable to add blueprint ".red + blueprintuid.red + ' to '.red + useruid.toString().red);
          console.log(err);
      })
}

async function getWorkouts(teamuid, blueprint) {
    const blueprintWorkoutsRef = await database.ref('blueprints/' + blueprint + '/workouts');
    let workouts = {};

    await blueprintWorkoutsRef.once('value').then(async (snapshot) => {
        let workoutsArray = [];
        await snapshot.forEach(function(child) {
            workoutsArray.push(child);
        });

        for(const workout of workoutsArray){
            const value = workout.key;
            await database.ref('workouts/' + value).once('value').then(workoutSnapshot => {
                workouts[value] = workoutSnapshot.val();
            }).catch(err => {
                console.log(`Error in getWorkouts - database ref workouts/val`.red);
                console.log(err);
            })
        }
    }).catch(err => {
        console.log('Error in getWorkouts'.red);
        console.log(err);
    })
    console.log('workout data passed: ');
    console.log(workouts);
    return workouts;
}

async function createWorkout(useruid, teamuid, blueprint, date, reps){
    const workoutRef = await database.ref('workouts').push();

    const workoutData = {
        date,
        reps,
        key: workoutRef.key.toString()
    }

    workoutRef.set(workoutData).then(async () => {
        addWorkoutToTeam(teamuid, workoutRef.key)
        addWorkoutToUser(useruid, workoutRef.key);
        addWorkoutToBlueprint(blueprint, workoutRef.key)
    }).catch(err => {
        console.log('Unable to create workout'.red + date.blue);
        console.log(err.toString());
    });

    return workoutData;
}

async function addWorkoutToBlueprint(blueprintuid, workoutuid){
    await database.ref('blueprints/' + blueprintuid + '/workouts').child(workoutuid).set(workoutuid)
    .then(() => {
    }).catch(err => {
        console.log("Unable to add workout ".red + workout.red + ' to '.red + blueprintuid.toString().red);
        console.log(err);
    })
}

async function addWorkoutToTeam(teamuid, workoutuid){
    await database.ref('teams/' + teamuid + '/workouts').child(workoutuid).set(workoutuid)
    .then(() => {
    }).catch(err => {
        console.log("Unable to add workout ".red + workout.red + ' to '.red + teamuid.toString().red);
        console.log(err);
    })
}

async function addWorkoutToUser(useruid, workoutuid){
    await database.ref('users/' + useruid + '/workouts').child(workoutuid).set(workoutuid)
      .then(() => {
      }).catch(err => {
          console.log("Unable to add workout ".red + workoutuid.red + ' to '.red + useruid.toString().red);
          console.log(err);
      })
}

async function addRunnerToWorkout(workoutuid, runnerUidArray){
    let runnersAdded = {};
    const workoutRef = database.ref("workouts/" + workoutuid + "/runners");
    for(const runner in runnerUidArray){
        let pTimes = [];
        let aTimes = [];
        workoutRef.once("value").then((snapshot) => {
            if(!snapshot.hasChild(runner)){
                // console.log("Next line is the test for the UidArray")
                // console.log(runnerUidArray[runner])
                // runnersAdded[runner] = runnerUidArray[runner];
                for(set in runnerUidArray[runner]){
                    pTimes.push(runnerUidArray[runner][set])
                }
                for(set in runnerUidArray[runner]){
                    if(runnerUidArray[runner][set].predictedDistance !== undefined){
                        let toAdd = {
                            mileage: 0
                        }
                        aTimes.push(toAdd)
                    } else {
                        let toAdd = {
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        }
                        aTimes.push(toAdd)
                    }
                }
                console.log("pTimes on next liine")
                console.log(pTimes);
                runnersAdded[runner] = {
                    pTimes: pTimes,
                    aTimes: aTimes
                }
                workoutRef.child("" + runner).child("pTimes").set(runnerUidArray[runner]).then(() => {
                }).catch(() => {
                    console.log("Error adding runner pTimes".cyan + runner + " to ".cyan + workoutuid)
                })
                workoutRef.child("" + runner).child("aTimes").set(aTimes).then(() => {
                }).catch(() => {
                    console.log("Error adding runner aTimes".cyan + runner + " to ".cyan + workoutuid)
                })
            }
        })
    }
  
    return runnersAdded;
  }

  async function sendATimes(aTimes, workoutuid, runneruid){
    console.log("Got to sendATimes in workoutUtilities");  
    await database.ref('workouts/' + workoutuid + '/runners/' + runneruid).child("aTimes").set(aTimes)
        .then(() => {
            console.log("Succesfully updated aTimes")
        }).catch(err => {
            console.log("Unable to update aTimes ".red + workoutuid.red + ' to '.red + runneruid.red)
        })
  }


module.exports.getBlueprints = getBlueprints;
module.exports.addBlueprintToTeam = addBlueprintToTeam;
module.exports.getAllBlueprints = getAllBlueprints;
module.exports.createBlueprint = createBlueprint;
module.exports.createWorkout = createWorkout;
module.exports.getWorkouts = getWorkouts;
module.exports.addRunnerToWorkout = addRunnerToWorkout;
module.exports.updateBlueprint = updateBlueprint;
module.exports.sendATimes = sendATimes;