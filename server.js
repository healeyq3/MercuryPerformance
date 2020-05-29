const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");

const app = express();
const port = process.env.PORT || 5000;

const authentication = require("./authentication");
const teamBackend = require("./teamBackend");
const runnerBackend = require("./runnerBackend");

app.use(logger("dev"));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Making the public folder static (can write filename.ext into url and load up file)
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({secret: "452948404D635166546A576E5A7234753777217A25432A462D4A614E64526755", saveUninitialized: false, resave: false}));

app.use("/login", authentication);
app.use("/teams", teamBackend);
app.use("/runners", runnerBackend);

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