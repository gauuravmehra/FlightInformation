(function () {
    'use strict';

    var angular = require('angular');

    // load all directives
    var onBlur = require('./flight/on-blur.directive');

    module.exports = angular.module('app.directive', [])
        .directive('onBlur', onBlur);

})();