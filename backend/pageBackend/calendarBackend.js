const express = require("express");
const router = express.Router();
const calendarUtilities = require("../firebaseUtilities/calendarUtilities");
const teamUtilities = require('../firebaseUtilities/teamUtilities');
const { authenticatePost } = require("../firebaseUtilities/authenticationUtilities");

router.post('/', getTeamDates);

module.exports = router;

async function getTeamDates(req, res){
    if(!await authenticatePost(req, res)){
        res.end();
        return;
    }

    const data = req.body;
    if(!await teamUtilities.doesUserOwnTeam(req)){
        res.end("{}")
        return;
    }

    calendarUtilities.getTeamCalendarDates(data.selectedTeamUID).then((dates) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dates));
    }).catch(err => {
        console.log("Err fetching dates in calendarBackend")
        console.log(err)
        res.end("{}");
    })

}

