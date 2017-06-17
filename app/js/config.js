(function () {
    'use strict';
    
    var config = function ($locationProvider, $routeProvider, ChartJsProvider) {
        
        $routeProvider
            .when('/', {
                templateUrl: './../app/js/weather/weather.view.html',
                controller: 'weatherController',
                controllerAs: 'vm'
            })
            .when('/:id', {
                templateUrl: './../app/js/weather/weather-detail.view.html',
                controller: 'weatherDetailController',
                controllerAs: 'vm'
            })
            .otherwise({
                templateUrl: './../app/js/weather/weather.view.html',
                controller: 'weatherController',
                controllerAs: 'vm'
            });

        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#46BFBD', '#FDB45C'],
            colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: true
        });
        
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: true
        });
    };

    config.$inject = ['$locationProvider', '$routeProvider', 'ChartJsProvider'];

    module.exports = config;

})();