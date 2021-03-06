var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');  // 1. express-ejs-layouts 추가코드
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var usersRouter = require('./routes/users');

var app = express();

// express-ejs-layout setting
app.set('layout', 'layout');  
// views/layout.ejs를 기본 레이아웃으로 설정하고 <%- body %> 부분에 렌더링 된 html 문자열이 들어감.
app.set("layout extractScripts",true);
// 렌더링된 html에서 모든 script 태그를 추출해서 <%- script %> 부분에 들어감.


// view engine setup
app.set('views', path.join(__dirname, 'views'));  // 디폴트 view 경로세팅 
app.set('view engine', 'ejs');                    // express 의 view 엔진을 ejs 로 세팅 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);  // 2. express-ejs-layouts 추가코드

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
