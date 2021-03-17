var createError = require("http-errors");
var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var models = require("./models/index.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var loginRouter = require("./routes/login");
// var signupRouter = require("./routes/signup");

var app = express();

models.sequelize
    .sync()
    .then(() => {
        console.log("DB연결 성공");
    })
    .catch((err) => {
        console.log("연결실패");
        console.log(err);
    });

// views/layout.ejs를 기본 레이아웃으로 설정하고 <%- body %> 부분에 렌더링 된 html 문자열이 들어감
app.set("layout", "layout");
// 렌더링된 html에서 모든 script 태그를 추출하여 <%- script %> 부분에 들어감
app.set("layout extractScripts", true);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: "sid",
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24000 * 60 * 60,
        },
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/signup", signupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
