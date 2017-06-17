(function () {
    'use strict';

    window.$ = window.jquery = require('jquery');
    var angular = require('angular'),
        config = require('./config'),
        constant = require('./constant');

    $(document).ready(function () {
        require('angular-route');
        require('angular-sanitize');
        require('./controller');
        require('chart.js');
        require('./service');

        angular.module('app', [
            'ngSanitize',
            'ngRoute',
            require('angular-chart.js'),
            'app.controller',
            'app.service'
        ])
        .config(config)
        .constant('api', constant);
    });
})();