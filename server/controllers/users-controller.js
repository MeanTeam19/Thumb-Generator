var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
            return;
        }

        res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    console.log(err);
                    if (err.code === 11000) {
                        req.session.error = 'This user is taken :(';
                    } else {
                        req.session.error = 'We couldn\'t register you... Please, try again :)';
                    }

                    res.redirect('/register');
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        req.session.error = err.toString();
                        res.redirect('/login');
                    }
                    else {
                        res.redirect('/');
                    }
                });
            });
        }
    },
    getLogin: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
            return;
        }

        res.render(CONTROLLER_NAME + '/login');
    }
};