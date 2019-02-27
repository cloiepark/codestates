var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var searchRouter = require('./routes/searchRouter');

var app = express();
const port = 3001;
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
const models = require('./models/index');


// Check DB-Server Connetion
models.sequelize
    .sync()
    .then(() => {
        console.log(' DB 연결 성공');
    })
    .catch(err => {
        console.log('연결 실패');
        console.log(err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(port, () => {
    console.log('example app listening on port ' + port + '!');
});

module.exports = app;
