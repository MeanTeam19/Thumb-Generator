var usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    unauthorizedController = require('./unauthorized-controller'),
    profileControler = require('./profile-controller');

module.exports = {
    users: usersController,
    unauthorized: unauthorizedController,
    statistics: statisticsController,
    profile: profileControler
};