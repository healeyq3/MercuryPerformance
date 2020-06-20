const firebaseSetup = require('./firebaseSetup');
const database = firebaseSetup.database;


// -------------- Workouts ----------------


async function getBlueprints(teamuid) {
    const startTime = Date.now();
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
    console.log("Finished Get Blueprints - ".green + (Date.now() - startTime).toString().cyan + 'ms'.cyan);
    return blueprints;
}

async function createBlueprint(teamuid, name, type, location){
    const blueprintRef = await database.ref('blueprints').push();

    const blueprintData = {
        name, 
        type,
        key: blueprintRef.key.toString()
    }

    blueprintRef.set(blueprintData).then(async () => {
        console.log("Successfully created the blueprint ".green + name.blue);
        console.log(teamuid);
        await addBlueprintToTeam(teamuid, blueprintRef.key)
    }).catch(err => {
        console.log('Unable to create blueprint'.red + name.blue);
        console.log(err.toString());
    });

    return blueprintData;
}

async function addBlueprintToTeam(teamuid, blueprintuid){
    await database.ref('teams/' + teamuid.toString() + '/blueprints').child(blueprintuid.toString()).set(blueprintuid)
    .then(() => {
        console.log("Successfully added blueprint ".green + blueprintuid.green + ' to '.green + teamuid.toString().green);
    }).catch(err => {
        console.log("Unable to add blueprint ".red + blueprintuid.red + ' to '.red + teamuid.toString().red);
        console.log(err);
    })
}


module.exports.getBlueprints = getBlueprints;
module.exports.createBlueprint = createBlueprint;