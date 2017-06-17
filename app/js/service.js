(function () {
    'use strict';

    var angular = require('angular');

    // load all directives
    var WeatherService = require('./weather/weather.service');


    module.exports = angular.module('app.service', [])
        .service('WeatherService', WeatherService);

})();