(function () {
    'use strict';
    let User = require('mongoose').model('User');

    module.exports = {
        create: function (user, callback) {
            User.create(user, callback);
        },
        getAllPublicMessages: function (callback) {
            User.find({}, {username: 1, messages: 1, _id: 0}, function (err, allUserMessages) {
                if (err) {
                    callback(err);
                    return
                }

                let allPublicMessages = [];
                allUserMessages.forEach(function (userMessages) {
                    userMessages.messages.forEach(function (message) {
                        let msg = {};
                        msg.username = userMessages.username;
                        msg.text = message.text;
                        msg.created = message.created;
                        msg.type = 'message';

                        allPublicMessages.push(msg);
                    })
                });

                allPublicMessages.sort(function (first, second) {
                    return first.created > second.created;
                });

                callback(null, allPublicMessages);
            });
        }
    };
}());