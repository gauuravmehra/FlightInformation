(function () {
    'use strict';
    var weatherDetailController = function ($scope, $route, $filter, WeatherService) {
        
        var vm = this;
        
        vm.forcastInfo = WeatherService.weatherForcastInfo;

        $scope.labels = [];
        $scope.series = ['Min', 'Max'];
        $scope.data = [[],[]];

        $.each(vm.forcastInfo.list, function (i, v) {
            var date = $filter('date')(new Date(v.dt * 1000),'dd/MM/yy');
            $scope.labels.push(date);
            $scope.data[0].push($filter('number')(v.temp.min, '0'));
            $scope.data[1].push($filter('number')(v.temp.max, '0'));
        });
    };

    weatherDetailController.$inject = ['$scope', '$route', '$filter', 'WeatherService'];
    module.exports = weatherDetailController;
})();
