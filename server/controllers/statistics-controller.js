var statistics = require('../data/statistics');

module.exports = {
  get: function (req, res, next) {
    return statistics.get;
  }
}