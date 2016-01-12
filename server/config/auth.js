var passport = require('passport');

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

                res.send({
                    success: true,
                    user: user
                });
            })
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
    isInRole: function (role) {
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
};