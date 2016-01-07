(function () {
    'use strict';
    let Post = require('mongoose').model('Post');

    module.exports = {
        create: function (user, callback) {
            Post.create(user, callback);
        }
    };
} ());