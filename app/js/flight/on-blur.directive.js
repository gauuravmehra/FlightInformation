(function () {
    'use strict';

    var onBlur = function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm) {
                elm.bind('change', function() {
                    scope.$apply(function() {
                        var depdate = new Date(elm.val()).toISOString().split('T')[0];
                        scope.vm.form.returnDate.attr('min', depdate);
                    });
                });
            }
        };
    };
    
    module.exports = onBlur;
})();