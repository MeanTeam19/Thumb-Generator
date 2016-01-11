var express = require('express'),
  router = express.Router(),
  controllers = require('../controllers');

router
  .get('/', function () {
    console.log('asd')
  }); //controllers.statistics.get

module.exports = function (app) {
  app.use('/api/statistics', router);
}