angular.module('formExample', [])
    .controller('ExampleController', ['$scope', function ($scope) {
        $scope.master = {};

        $scope.update = function (user) {
            $scope.master = angular.copy(user);
        };

        $scope.reset = function () {
            $scope.user = angular.copy($scope.master);
        };

        $scope.reset();
    }])
    .directive('integer', function() {
        var INTEGER_REGEXP = /^\-?\d+$/;
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$validators.integer = function(modelValue, viewValue) {
                    if (INTEGER_REGEXP.test(viewValue)) {
                        return true;
                    }
                    return false;

                };
            }
        };
    })
    .directive('username', function($q, $timeout) {
        var usernames = ['hello', 'tired'];
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$asyncValidators.myusername = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return $q.when();
                    }
                    var def = $q.defer();

                    $timeout(function() {
                        if (usernames.indexOf(modelValue) === -1) {
                            //resolve promise if the username isn't found in the "server".
                            def.resolve();
                        } else {
                            //reject promise if the username is found in the "server".
                            def.reject();
                        }
                    }, 2000);
                    return def.promise;
                };
            }
        };
    });