(function(){
    'use strict';

    angular.module('homeDirectives', [])

        .directive('trHeader', trHeader) // tr-header
        .directive('slThelist', slThelist)
        .controller('slThelistController', slThelistController);

    function trHeader() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<tr><th>Item</th><th>Quantity</th><th>Purchased</th><th>Edit</th></tr>'
        };
    }

    function slThelist() {
        return {
            restrict: 'A',
            templateUrl: 'templates/slThelist.html',
            bindToController: {
                item: '=',
                index: '='
            },
            controller: 'slThelistController as lc'
        };
    }

    function slThelistController() {
        var lc = this;
        lc.index++;
    }

}());
