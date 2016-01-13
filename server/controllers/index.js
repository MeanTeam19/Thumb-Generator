var usersController = require('./users-controller'),
    statisticsController = require('./statistics-controller'),
    unauthorizedController = require('./unauthorized-controller'),
    profileControler = require('./profile-controller'),
    postsController = require('./posts-controller'),
    chatController = require('./chat-controller');

module.exports = {
    users: usersController,
    unauthorized: unauthorizedController,
    statistics: statisticsController,
    profile: profileControler,
    posts: postsController,
    chat: chatController
};