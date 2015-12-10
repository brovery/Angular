/**
 * Created by brandon_overy on 12/7/15.
 */
angular.module('registrationApp', [])
.controller('registrationController', function($scope) {
    $scope.master = {Name:"John Doe", DOB:"5/5/1980", Gender:"Male"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

})
    .controller('SubmitController', ['$scope', function($scope) {
        $scope.list = [];
        $scope.text = 'hello';
        //$scope.names = [];
        $scope.submit = function() {
            if ($scope.text) {
                $scope.list.push(this.text);
                $scope.text = '';
            }
        };
    }]);