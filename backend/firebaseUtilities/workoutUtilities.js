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


module.exports.getBlueprints = getBlueprints;
module.exports.addBlueprintToTeam = addBlueprintToTeam;
module.exports.getAllBlueprints = getAllBlueprints;
module.exports.createBlueprint = createBlueprint;