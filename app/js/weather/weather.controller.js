(function () {
    'use strict';
    var weatherController = function ($scope, $http, $location, WeatherService) {
        var vm = this;
        
        if ($.isEmptyObject(WeatherService.weatherList)) {
            var cityList = [
                2643743, //london, GB
                2968815, //Paris, FR
                2759794, //Amsterdam, NL
                2960316, //Luxembourg, Luxembourg
                2638360 //Scotland, GB
            ];

            WeatherService.getWeatherInfo(cityList).then(function (res) {
                vm.weatherList = res.list;
            });
        } else {
            vm.weatherList = WeatherService.weatherList;
        }

        $scope.detailInfo = detailInfo;

        function detailInfo (id) {
            WeatherService.getForcastInfo(id).then(function (res) {
                WeatherService.weatherForcastInfo = res;
                $location.path('/' + id);
            });
        }
    };

    weatherController.$inject = ['$scope', '$http', '$location', 'WeatherService'];
    module.exports = weatherController;
})();
