var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    busboy = require('connect-busboy'),
    passport = require('passport');

module.exports = function(app, io, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.set('socketio', io);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    var mongoStore = new MongoStore({
        mongooseConnection: mongoose.connection
    });
    app.use(busboy({immediate: false}));
    app.use(session({secret: 'magic unicorns', resave: true, saveUninitialized: true, store: mongoStore}));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./socketio')(io, mongoStore);
    app.use(express.static(config.rootPath + '/public'));
    app.use(function(req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        }
        else {
            app.locals.errorMessage = undefined;
        }

        next();
    });
};