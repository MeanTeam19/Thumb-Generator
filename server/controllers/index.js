'use strict';
let usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    adminController = require('./admin-controller');

module.exports = {
    users: usersController,
    statistics: statisticsController,
    admin: adminController
};