var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'admin';

module.exports = {
    getAdminPanel: function (req, res, next) {
        users.getAll().then(function (result) {
            res.render(CONTROLLER_NAME + '/admin-panel', { data: { result: result } });
        });

    },

    getAllUsers: function (req, res, next) {
        users.getAll().then(function (result) {
            res.send({ data: { result: result } });
        })
    },

    editUserPage: function (req, res, next) {
        users.getOne(req.params.id)
            .then(function (result) {
                console.log(result)
                res.render(CONTROLLER_NAME + '/edit-user-page', { data: { user: result } });
            });
    },
    
    updateUser: function (req, res, next) {
        console.log('started updating');
        users.update(req.body)
            .then(function name(result) {
                console.log('finished updating');
                res.redirect('/admin-panel');
            });
    },
    
    postRegister: function (req, res, next) {
        console.log(req.body);
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {

            console.log(newUserData);
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