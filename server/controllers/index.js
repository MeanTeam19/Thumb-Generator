'use strict';
let usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    adminController = require('./admin-controller');
var usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    chatController = require('./chat-controller');

module.exports = {
    users: usersController,
    statistics: statisticsController,
    admin: adminController
    chat: chatController
};