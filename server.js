const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyBrQCEANaN3Z5s4xjoaOm6MocXGnlF-p_0",
    authDomain: "mercury-1875e.firebaseapp.com",
    databaseURL: "https://mercury-1875e.firebaseio.com",
    projectId: "mercury-1875e",
    storageBucket: "mercury-1875e.appspot.com",
    messagingSenderId: "478630514853",
    appId: "1:478630514853:web:5cced82d5d9e1ea08abd4c",
    measurementId: "G-8DRXMZRMHH"
};
firebase.initializeApp(firebaseConfig);

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const FirestoreStore = require('firestore-store')(expressSession);
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const authentication = require("./backend/pageBackend/authenticationRoutes");
const teamBackend = require("./backend/pageBackend/teamBackend");
const runnerBackend = require("./backend/pageBackend/runnerBackend");
const eventsBackend = require("./backend/pageBackend/eventsBackend");
const workoutsBackend = require('./backend/pageBackend/workoutsBackend');

app.use(logger("dev"));
app.use(cors({origin: true}));
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Making the public folder static (can write filename.ext into url and load up file)
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({secret: "452948404D635166546A576E5A7234753777217A25432A462D4A614E64526755", saveUninitialized: false, resave: false}));

app.use("/api/login", authentication);
app.use("/api/runners", runnerBackend);
app.use("/api/teams", teamBackend);
app.use("/api/events", eventsBackend);
app.use('/api/workouts', workoutsBackend);

app.listen(port, () => console.log(`Listening on port ${port}`));

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