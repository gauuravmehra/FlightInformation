(function () {
	'use strict';
	var airports = require('./../../assets/data/airport-info.json'),
		flightdata = require('./../../assets/data/flight-info.json');

	var DataService = function () {
		
		var vm = this;

		vm.getFlights = getFlights;
		vm.getAirports = getAirports;
		////////

		function getFlights () {
			return flightdata;
		}

		function getAirports () {
			return airports;
		}
	};

	module.exports = DataService;
    
})();