'use strict';
let express = require('express'),
    router = express.Router(),
    controllers = require('../controllers'),
    auth = require('../config/auth');

router
    .all('*', function (req, res, next) {
        res.locals.currentUser = req.user;
        next();
    })
    .get('/register', controllers.users.getRegister)
    .post('/register', controllers.users.postRegister)
    .get('/login', controllers.users.getLogin)
    .post('/login', auth.login, controllers.users.getLogin)
    .get('/logout', auth.logout)
    .get('/admin', controllers.admin.getLogin)
    .get('/admin-panel', auth.isInRole('admin'), controllers.admin.getAdminPanel)
    .get('/:id', auth.isInRole('admin'), controllers.admin.editUserPage)
    .post('/update-user', auth.isInRole('admin'), controllers.admin.updateUser)
    .get('/', function (req, res) {
        console.log(req.user);
        res.render('index', { currentUser: req.user });
    });

module.exports = function (app) {
    app.use('/', router);
};