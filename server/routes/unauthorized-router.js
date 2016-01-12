var express = require('express'),
    router = express.Router(),
    controllers = require('../controllers');

router
    .get('/', controllers.unauthorized.getUnauthorized);

module.exports = function (app) {
    app.use('/unauthorized', router);
}