(function () {
    'use strict';
    
    window.$ = window.jQuery = require('jquery');

    $(document).ready(function () {
        var angular = require('angular'),
        config = require('./config');
        
        require('angular-route');
        require('angular-sanitize');
        require('./controller');
        require('./service');
        require('./directive');
        require('bootstrap-sass');
        require('angular-rangeslider');

        angular.module('app', [
            'ngSanitize',
            'ngRoute',
            'app.controller',
            'app.service',
            'app.directive',
            'ui-rangeSlider'
        ])
        .config(config);
    });
})();