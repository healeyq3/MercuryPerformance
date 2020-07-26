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

async function createBlueprint(useruid, teamuid, name, reps, totalSeconds, totalDistance){
    const blueprintRef = await database.ref('blueprints').push();

    const blueprintData = {
        name,
        reps,
        totalSeconds,
        totalDistance,
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

async function updateBlueprint(name, reps, workouts, blueprintuid, totalSeconds, totalDistance){
    const blueprintRef = await database.ref('blueprints/' + blueprintuid);

    const blueprintData = {
        name, 
        reps,
        workouts,
        totalSeconds,
        totalDistance,
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

async function createWorkout(useruid, teamuid, blueprint, date, reps, name){
    const workoutRef = await database.ref('workouts').push();

    const workoutData = {
        date,
        reps,
        name,
        key: workoutRef.key.toString()
    }

    workoutRef.set(workoutData).then(async () => {
        addWorkoutToTeam(teamuid, workoutRef.key, date, name)
        addWorkoutToUser(useruid, workoutRef.key, date, name);
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

async function addWorkoutToTeam(teamuid, workoutuid, date, name){
    await database.ref('teams/' + teamuid + '/workouts').child(workoutuid).child("date").set(date)
    .then(() => {
    }).catch(err => {
        console.log("Unable to add workout ".red + workout.red + ' to '.red + teamuid.toString().red);
        console.log(err);
    })
    await database.ref("teams/" + teamuid + '/workouts/' + workoutuid).child("name").set(name).then(() => {})
    .catch(err => {
        console.log("Unable to add name to the workout in teams".red)
        console.log(err);
    })
}

async function addWorkoutToUser(useruid, workoutuid, date, name){
    await database.ref('users/' + useruid + '/workouts').child(workoutuid).child("date").set(date)
      .then(() => {
      }).catch(err => {
          console.log("Unable to add workout ".red + workoutuid.red + ' to '.red + useruid.toString().red);
          console.log(err);
      })
    await database.ref("users/" + useruid + "/workouts/" + workoutuid).child("name").set(name).then(() => {})
    .catch(err => {
        console.log("Unable to add name to the workout in users".red);
        console.log(err);
    })
}

async function addRunnerToWorkout(workoutuid, runnerUidArray){
    let runnersAdded = {};
    const workoutRef = database.ref("workouts/" + workoutuid + "/runners");
    for(const runner in runnerUidArray){
        let pTimes = [];
        let aTimes = [];
        let pTimesToCompare = [];
        workoutRef.once("value").then((snapshot) => {
            if(!snapshot.hasChild(runner)){
                // console.log("Next line is the test for the UidArray")
                // console.log(runnerUidArray[runner])
                // runnersAdded[runner] = runnerUidArray[runner];
                for(set in runnerUidArray[runner].pTimes){
                    pTimes.push(runnerUidArray[runner].pTimes[set])
                }
                for(set in runnerUidArray[runner].pTimes){
                    if(runnerUidArray[runner].pTimes[set].predictedDistance !== undefined){ // Time Rep
                        if(runnerUidArray[runner].pTimes[set].type !== 'duration rest' && runnerUidArray[runner].pTimes[set].type !== 'duration warmup' && runnerUidArray[runner].pTimes[set].type !== 'duration cooldown'){
                            let toAdd = {
                                mileage: 0,
                                percentEffort : 0,
                                percentOff: 0
                            }
                            aTimes.push(toAdd)
                            pTimesToCompare.push({
                                predictedMileage: runnerUidArray[runner].pTimes[set].predictedDistance,
                                totalSeconds: runnerUidArray[runner].pTimes[set].totalSeconds,
                                percentEffort: runnerUidArray[runner].pTimes[set].percentEffort
                            })
                        }
                    } else { //Distance Rep
                        if(runnerUidArray[runner].pTimes[set].type !== 'distance rest' && runnerUidArray[runner].pTimes[set].type !== 'distance warmup' && runnerUidArray[runner].pTimes[set].type !== 'distance cooldwon'){
                            let toAdd = {
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                                percentEffort: 0,
                                percentOff: 0
                            }
                            aTimes.push(toAdd)
                            pTimesToCompare.push({
                                predictedSeconds: runnerUidArray[runner].pTimes[set].predictedSeconds,
                                repDist: runnerUidArray[runner].pTimes[set].repDist,
                                repUnit: runnerUidArray[runner].pTimes[set].repUnit,
                                percentEffort: runnerUidArray[runner].pTimes[set].percentEffort
                            })
                        }
                        
                    }
                }
                console.log("pTimes on next liine")
                console.log(pTimes);
                runnersAdded[runner] = {
                    pTimes: pTimes,
                    aTimes: aTimes,
                    pTotal: runnerUidArray[runner].pTotal,
                    pTimesToCompare: pTimesToCompare,
                    wPace: runnerUidArray[runner].wPace,
                    wV02: runnerUidArray[runner].wV02
                }
                workoutRef.child("" + runner).child("pTimes").set(runnerUidArray[runner].pTimes).then(() => {
                }).catch(() => {
                    console.log("Error adding runner pTimes".cyan + runner + " to ".cyan + workoutuid)
                })
                workoutRef.child("" + runner).child("aTimes").set(aTimes).then(() => {
                }).catch(() => {
                    console.log("Error adding runner aTimes".cyan + runner + " to ".cyan + workoutuid)
                })
                workoutRef.child("" + runner).child('pTotal').set(runnerUidArray[runner].pTotal).then(() => {
                }).catch(() => {
                    console.log("Error adding pTotal to ".red + runner);
                })
                workoutRef.child("" + runner).child('wPace').set(runnerUidArray[runner].wPace).then(() => {
                }).catch(() => {
                    console.log("Error adding wPace to ".red + runner);
                })
                workoutRef.child("" + runner).child('wV02').set(runnerUidArray[runner].wV02).then(() => {}).catch(err => {
                    console.log("Error adding wV02 to ".red + runner);
                })
                workoutRef.child("" + runner).child('pTimesToCompare').set(pTimesToCompare).then(() => {}).catch(err => {
                    console.log("Error adding pTimesToCompare to ".red) + runner
                })
                database.ref("runners/" + runner + "/workouts").child(workoutuid).set(workoutuid).then(() => {
                    console.log("Successfully added the workout " + workoutuid.green + " to the runner" + runner.green )
                }).catch(err => {
                    console.log("Un-successfully added the event " + workoutuid.red + " to the runner" + runner.red )
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