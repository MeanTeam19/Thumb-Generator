'use strict';

let express = require('express'),
    router = express.Router();

router.get('/chat', function (req, res, next) {
    if (!req.user) {
        res.redirect('/');
        return;
    }

    res.render('chat/chat');
});

module.exports = function (app) {
    app.use('/', router);
};