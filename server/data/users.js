'use strict';
let Users = require('mongoose').model('User');

module.exports = {
    create: function (user, callback) {
        Users.create(user, callback);
    },
    getAll: function () {

        let promise = new Promise(function (resolve, reject) {
            Users.find({})
                // .sort() orderBy reg date, to be implemented.
                .exec(function (err, users) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(users);
                });
        });

        return promise;
    },
    update: function (options) {
        console.log("in update method");
        console.log(options);
        let promise = new Promise(function (resolve, reject) {
            Users.findOne({username: options.username})
                .exec(function (err, user) {
                    if (err) {
                        return reject(err);
                    }
                    user.firstName = options.firstName;
                    user.lastName = options.lastName;
                    user.email = options.email;
                    options.isAdmin ? user.role = ['admin'] : user.role = ['regular'];
                    user.save();
                    resolve(user);
                });
        });

        return promise;
    },
    getOne: function (id) {
        let promise = new Promise(function (resolve, reject) {
            Users.findById(id)
                .exec(function (err, user) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(user);
                });
        });

        return promise;
    },
    getAllPublicMessages: function (callback) {
        Users.find({}, {username: 1, messages: 1, _id: 0}, function (err, allUserMessages) {
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
