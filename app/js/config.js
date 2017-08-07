(function () {
    'use strict';
    
    var config = function ($locationProvider, $routeProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: './../app/js/flight/flight.view.html',
                controller: 'DataController',
                controllerAs: 'vm'
            })
            .otherwise({
                templateUrl: './../app/js/flight/flight.view.html',
                controller: 'DataController',
                controllerAs: 'vm'
            });
    };

    config.$inject = ['$locationProvider', '$routeProvider'];

    module.exports = config;

})();