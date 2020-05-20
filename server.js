const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

const firebaseUtils = require("./firebaseUtils");
const authentication = require("./authentication");

app.use(logger("dev"));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser());

// Making the public folder static (can write filename.ext into url and load up file)
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({secret: "2515b895-3840-400a-9049-d5a4a4cb44f5", saveUninitialized: false, resave: false}));
app.use("/login", authentication);

app.listen(port, () => console.log(`Listening on port ${port}`));

//move to team router eventually
app.post('/createTeam', (req, res) => {
    if(req.body.idToken == null || !firebaseUtils.authenticateToken(req.idToken)){
        res.end();
        return;
    } else {
        console.log("Got through user authentication");
        const data = req.body;
        console.log(data);

        firebaseUtils.createTeam(data.user, data.teamName, data.teamYear, data.teamLevel, data.teamWorkoutFormula).then((teams) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(teams));
        }).catch((error) => {
            console.log("Error adding and fetching teams");
            res.end();
        })
    }
});

app.post('/teams', (req, res) => {
    if(req.body.idToken == req.session.idToken){
        firebaseUtils.getUserTeams(req.session.user).then((teams) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(teams));
        }).catch((error) => {
            console.log(error);
            res.end();
        });
    } else {
        console.log("Request denied".red);
        res.end();
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.json({error : err});
});

module.exports = app;