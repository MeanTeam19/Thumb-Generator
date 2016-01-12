'use strict';

var statistics = require('../data/statistics');

module.exports = {
  getStatistics: function (req, res, next) {
    res.status(200)
      .send({
        result: statistics.get
      });
    res.end();
  }
}