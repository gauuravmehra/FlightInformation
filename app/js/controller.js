(function () {
    'use strict';

    var angular = require('angular');

    // load all controllers
    var headerController = require('./header/header.Controller'),
        weatherController = require('./weather/weather.controller'),
        weatherDetailController = require('./weather/weather-detail.controller');

    module.exports = angular.module('app.controller', [])
        .controller('headerController',                 headerController)
        .controller('weatherController',                weatherController)
        .controller('weatherDetailController',          weatherDetailController);

})();