/**
 * Created by brandon_overy on 12/10/15.
 */
var myApp = angular.module(​'myApp'​,[]);
myApp.controller(​'DoubleController'​, DoubleController);
function DoubleController() {
    var dc = this;
    dc.num = 1;
    dc.double = double;

    function double(value) {
        return value*2;
    }

}
