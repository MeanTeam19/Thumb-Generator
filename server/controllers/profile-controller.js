var encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User');

var CONTROLLER_NAME = 'profile';

module.exports = {
    getProfile: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/profile', { currentUser: req.user })
    },
    getUpdateUser: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/update')
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') >= 0) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({ _id: req.body._id }, updatedUserData, function () {
                res.end();
            })
        }
        else {
            res.send({ reason: 'You do not have permissions!' })
        }
    },
    getAllUsers: function (req, res) {
        User
            .find({})
            .exec(function (err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }

                res.send(collection);
            })
    },
    getUserDetails: function (req, res) {
        User
            .find({ username: req.params.username })
            .exec(function (err, user) {
                if (err) {
                    console.log('Get all users failed: ' + err);
                    return;
                }
            });

    },
    deleteUser: function (req, res) {
        if (req.user.roles.indexOf('admin') > -1) {
            User.remove({ _id: req.params.id }, function (err, user) {
                if (err) {
                    console.log('Delete user by id failed: ' + err);
                    return;
                }

                res.status(202)
                    .send(user);
                res.end();
            });
        }
        else {
            res.send({ reason: 'You do not have permissions!' })
        }
    }
};