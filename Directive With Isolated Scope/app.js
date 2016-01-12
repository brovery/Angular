angular.module('isolate-scope', [])

    .controller('IsolatedScopeController', function($scope) {
        $scope.name = 'Bill';
        $scope.clickMe = function(param) {
            console.log('I was clicked! Param value = ' + param);
        };
    })

    .directive('customerName', function() {
        return {
            scope: {
                name: '=',
                action: '&'
            },
            template: '<span>Customer name (from directive): <input ng-model="name"/><input ' +
            'type="button" ng-click="action()(name)" value="Click Me!"/></span>'
        };
    });
