const firebaseSetup = require("./firebaseSetup");
const database = firebaseSetup.database;

async function getTeamCalendarDates(teamuid){
    const eventDateRef = database.ref("teams/" + teamuid + "/events");
    const workoutDateRef = database.ref("teams/" + teamuid + "/workouts");
    let eventDates = {};
    let workoutDates = {};
    await eventDateRef.once("value").then(async (snapshot) => {
        let eventArray = [];
        snapshot.forEach(function(child) {
            eventArray.push(child);
        })
        for (const event of eventArray){
            const value = event.key;
            eventDates[value] = event.val();
        }
    }).catch(err => {
        console.log("Error fetching the event calendar dates".red)
        console.log(err);
    })

    await workoutDateRef.once("value").then(async (snapshot) => {
        let workoutArray = [];
        snapshot.forEach(function (child) {
            workoutArray.push(child)
        })
        for(const workout of workoutArray){
            const value = workout.key;
            workoutDates[value] = workout.val();
        }
    }).catch(err => {
        console.log("Error fetching the workout calendar dates".red)
        console.log(err);
    })

    const dates = {
        eventDates,
        workoutDates
    }

    return dates;
}

module.exports.getTeamCalendarDates = getTeamCalendarDates;