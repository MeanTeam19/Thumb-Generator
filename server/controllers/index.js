var usersController = require('./users-controller'),
  statisticsController = require('./statistics-controller');
var AdminController = require('./AdminController');

module.exports = {
    users: UsersController,
  users: usersController,
  statistics: statisticsController
    admin: AdminController
};