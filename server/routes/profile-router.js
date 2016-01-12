var express = require('express'),
    router = express.Router(),
    controllers = require('../controllers');

router
    .get('/', controllers.profile.getProfile)
    .get('/update', controllers.profile.getUpdateUser)
    .post('/update', controllers.profile.updateUser)
    .get('/:username', controllers.profile.getUserDetails);

module.exports = function (app) {
    app.use('/profile', router);
};