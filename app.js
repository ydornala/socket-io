


const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const routes = require('./routes/index');
const users = require('./routes/user');
const section = require('./routes/section');
const question = require('./routes/question');
const answer = require('./routes/answer');
const result = require('./routes/result');

const app = express();
const rp = require('request-promise');

const server = require('http').createServer(app);

const io = require('socket.io')(server);
const axios = require('axios');

io.on('connection', (socket) => {
    socket.on('question', function(d) {
        io.emit('question', d);
    });

    socket.on('section', (params) => {
        console.log('section ==> ', params);

        axios.get('https://deepak-socket-io.herokuapp.com/section/next/' + params.id)
            .then((res) => {
                // console.log('next  post ==> ', res);
                io.emit('section', res.data);
            }, err => {
                console.error('error');
            });
    });

    socket.on('result', (answers) => {
        axios.post('https://deepak-socket-io.herokuapp.com/result/', answers)
            .then(res => {
                io.emit('result', res.data);
            })
     });
});
//require('./routes/index').init(io);

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/section', section);
app.use('/question', question);
app.use('/answer', answer);
app.use('/result', result);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

mongoose.connect('mongodb://admin:admin123@ds261078.mlab.com:61078/deepakdemo', {}, (err) => {
    if(err) {
        console.log('Mongo Db connection error', err);
        process.exit(1);
    }

    console.log('Connected DB...');
    server.listen(process.env.PORT || 3010);
});

//module.exports = app;
