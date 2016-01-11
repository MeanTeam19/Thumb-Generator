(function () {
  'use strict';
  let users = require('mongoose').model('User');

  module.exports = {
    get: function () {
      var usersCount;
      users.count(function (err, count) {
        if (err) {
          console.log(err.message);
        } else {
          usersCount = count;
        }
      });

      return {
        users: usersCount || 0
      }
    }
  }
} ());