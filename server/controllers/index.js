var usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    chatController = require('./chat-controller');

module.exports = {
    users: usersController,
    statistics: statisticsController,
    chat: chatController
};