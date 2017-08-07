(function () {
    'use strict';

    var angular = require('angular');

    // load all directives
    var DataService = require('./flight/flight.service');


    module.exports = angular.module('app.service', [])
        .service('DataService', DataService);

})();