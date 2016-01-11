var express = require('express'),
    router = express.Router(),
    controllers = require('../controllers'),
    auth = require('../config/auth');

router
    .get('/register', controllers.users.getRegister)
    .post('/register', controllers.users.postRegister)
    .get('/login', controllers.users.getLogin)
    .post('/login', auth.login)
    .get('/logout', auth.logout)
    .get('/admin', controllers.admin.getLogin)
    .get('/admin-panel', auth.isInRole('admin'), controllers.admin.getAdminPanel)
    .get('/', function (req, res) {
        res.render('index', { currentUser: req.user });
    })
    .get('*', function (req, res) {
        res.render('index', { currentUser: req.user });
    });

module.exports = function (app) {
    app.use('/', router);
};