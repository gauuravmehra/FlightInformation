(function () {
	'use strict';
	var WeatherService = function ($q, $http, api) {
		
		var vm = this;
		
		vm.weatherForcastInfo = {};
		vm.weatherList = getsessionStoreWeatherList() || {};

		vm.getGroupApi = getGroupApi;
		vm.getForcastApi = getForcastApi;
		vm.getWeatherInfo = getWeatherInfo;
		vm.getForcastInfo = getForcastInfo;

		////////

		function getWeatherInfo (arr) {
			var deferred = $q.defer();
			if ($.isEmptyObject(vm.weatherList)) {
				return $http.get(vm.getGroupApi(api, arr))
					.then(function (response) {
						deferred.resolve(response.data);
						vm.weatherList = response.data;
						setsessionStoreWeatherList(response.data);
						console.log(response);
						return deferred.promise;
					}, function (response) {
						deferred.reject(response);
						return deferred.promise;
					});
			} else {
				return vm.weatherList;
			}
		}

		function getForcastInfo (id) {
			var deferred = $q.defer();

			return $http.get(vm.getForcastApi(api, id))
				.then(function (response) {
					deferred.resolve(response.data);
					vm.weatherForcastInfo = response.data;
					return deferred.promise;
				}, function (response) {
					deferred.reject(response);
					return deferred.promise;
				});
		}

		function getGroupApi (a, data) {
			return a.APIENDPOINT + a.GROUP + 'id=' + data.toString() + a.UNIT + '&appid=' + a.APPID;
		}

		function getForcastApi (a, data) {
			return a.APIENDPOINT + a.FORCAST + 'id=' + data + a.UNIT + '&appid=' + a.APPID;
		}

		function getsessionStoreWeatherList () {
			if (window.sessionStorage.length && window.sessionStorage['weatherList'] !== undefined) {
				return JSON.parse(window.sessionStorage['weatherList']);
			}
		}

		function setsessionStoreWeatherList (data) {
			window.sessionStorage['weatherList'] = JSON.stringify(data);
		}
	};

	WeatherService.$inject = ['$q', '$http', 'api'];

	module.exports = WeatherService;
})();