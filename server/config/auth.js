var passport = require('passport');

function isInRole(role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.role.indexOf(role) !== -1) {

            console.log('Is in role.');
            next();
        } else {
            res.status(403)
                .end('<h1>Unauthorized</h1>');
        }
    }
}

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (error, user) {
            if (error) {
                return next(error);
            }

            console.log(user);
            if (!user) {
                res.send({
                    success: false
                });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                if (user.role.indexOf('admin') >= 0) {
                    res.redirect('/admin-panel');
                }

                next();
            });
        });

        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403)
                .redirect('/login');
        } else {
            next();
        }
    },
    isInRole: isInRole
};