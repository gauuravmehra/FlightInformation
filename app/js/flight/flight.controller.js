(function () {
    'use strict';
    /* global angular */

    var DataController = function ($scope, DataService) {
        var vm = this,
        rangemin = 0,
        rangemax = 0;
        
        vm.FlightList = DataService.getFlights();
        vm.AirportList = DataService.getAirports();
        vm.formType = 'return';
        vm.search = search;
        vm.result = [];
        vm.rangemin = '0';
        vm.rangemax = '20000';

        vm.form = {
            journeyType: $('#journey-select'),
            source: $('#source'),
            destination: $('#destination'),
            departure: $('#departure'),
            returnDate: $('#return'),
            passenger: $('#passenger')
        };

        vm.data = {
            isOneway: '' || vm.form.journeyType.val(),
            source: '' || vm.form.source.val(),
            destination: '' || vm.form.destination.val(),
            departure: '' || vm.form.departure.val(),
            returnDate: '' || vm.form.returnDate.val(),
            passenger: '' || vm.form.passenger.val()
        };

        $scope.$watch('vm.formType', function (val) {
            if (val !== 'return') {
                vm.form.returnDate.attr('disabled', 'disabled');
            } else {
                vm.form.returnDate.attr('disabled', false);
            }
        });

        //===

        function search () {
            event.preventDefault();
            
            var result = {
                departure: [],
                returnDate: [] 
            };
                
            vm.data.isOneway = vm.formType === 'oneway';
            vm.data.source = vm.form.source.val() === 'Select' ? null : vm.form.source.val();
            vm.data.destination = vm.form.destination.val() === 'Select' ? null : vm.form.destination.val();
            vm.data.departure = vm.form.departure.val() !== '' && vm.form.departure.val().split('-').length === 3 ? new Date(vm.form.departure.val()).setHours(0,0,0,0) : null;
            vm.data.returnDate = !vm.data.isOneway ? (vm.form.returnDate.val()  !== '' && vm.form.returnDate.val().split('-').length === 3 ? new Date(vm.form.returnDate.val()).setHours(0,0,0,0) : null) : null;
            vm.data.passenger = vm.form.passenger.val();

            vm.data.departure = typeof vm.data.departure === 'number' ? new Date(vm.data.departure) : vm.data.departure;
            vm.data.returnDate = typeof vm.data.returnDate === 'number' ? new Date(vm.data.returnDate) : vm.data.returnDate;
            
            if (vm.data.isOneway) {
                angular.forEach(vm.FlightList, function (val, ind) {
                    var samedate = new Date(val.departure).setHours(0,0,0,0) === vm.data.departure.setHours(0,0,0,0),
                    sameSource = val.source.split(',')[1] === vm.data.source,
                    sameDestination = val.destination.split(',')[1] === vm.data.destination;
                    
                    if (samedate && sameSource && sameDestination) {
                        result.departure.push(val);
                    }
                });
            } else {
                angular.forEach(vm.FlightList, function (val, ind) {
                    var sameDepdate, sameSource, sameDestination, sameRetdate, sameRetSource, sameDesRettination;

                    if (vm.data.departure !== null) {
                        sameDepdate = new Date(val.departure).setHours(0,0,0,0) === vm.data.departure.setHours(0,0,0,0);
                        sameSource = val.source.split(',')[1] === vm.data.source;
                        sameDestination = val.destination.split(',')[1] === vm.data.destination;
                        
                        if (sameDepdate && sameSource && sameDestination) {
                            result.departure.push(val);
                        }
                    }
                    // returnDate
                    if (vm.data.returnDate !== null) {
                        sameRetdate = new Date(val.departure).setHours(0,0,0,0) === new Date(vm.data.returnDate).setHours(0,0,0,0);
                        sameRetSource = val.source.split(',')[1] === vm.data.destination;
                        sameDesRettination = val.destination.split(',')[1] === vm.data.source;

                        if (sameRetdate && sameRetSource && sameDesRettination) {
                            result.returnDate.push(val);
                        }
                    }
                    
                });
            }

            vm.result = result.returnDate.length || result.departure.length ? result : [];

            var combined = result.returnDate.concat(result.departure);
            combined = $.map(combined, function (obj) {
                return obj.fare;
            });

            vm.rangemin = rangemin = Math.floor(Math.min.apply(this, combined));
            vm.rangemax = rangemax = Math.floor(Math.max.apply(this, combined));
        }

        (function () {
            var date = new Date(),
                min = date.toISOString().split('T')[0],
                max = date.setMonth(date.getMonth()+2);

                max = new Date(max).toISOString().split('T')[0];

            vm.form.departure.attr('min', min).attr('max', max);
            vm.form.returnDate.attr('min', min).attr('max', max);
        })();
    };

    DataController.$inject = ['$scope', 'DataService'];
    module.exports = DataController;
})();
