(function() {
    "use stritc";

    angular
        .module('app.filters')
        .filter('toCamelcaseUpperSample', toCamelcaseUpperSample);

    toCamelcaseUpperSample.$inject = [];

    function toCamelcaseUpperSample() {
        return function(input) {
            //TODO: implement
            return "[ " + input + " ]";
        }
    }

})();