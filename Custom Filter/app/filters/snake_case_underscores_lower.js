/**
 * Created by geoffbrown1 on 12/16/15.
 */
(function() {
    "use strict";

    angular
        .module('app.filters')
        .filter('to_snake_case_underscores_lower', to_snake_case_underscores_lower);

    to_snake_case_underscores_lower.$inject = ['IdentifierService'];

    function to_snake_case_underscores_lower(IdentifierService) {
        return function(input) {
            //TODO: implement
            var caseType = IdentifierService.getCaseType(input);
            if (caseType == 'CAMEL_CASE_UPPER' || caseType == 'CAMEL_CASE_LOWER') {
                var myArr = input.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1);
                return (myArr.join("_").toLowerCase());
            }
            else if (caseType == 'SNAKE_CASE_HYPHENS') {
                return input.replace("-", "_").toLowerCase();

            }
            else if (caseType == 'SNAKE_CASE_UNDERSCORES_LOWER' || caseType == 'SNAKE_CASE_UNDERSCORES_UPPER') {
                return input.toLowerCase();
            }
            else {
                return input;
            }
            //console.log(IdentifierService.getCaseType(input));
            return "[ " + input + " ]";
        };
    }

})();