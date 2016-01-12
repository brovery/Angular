(function() {
    "use strict";

    angular
        .module('app.identifier')
        .constant('Case', {
            CAMEL_CASE_UPPER: "CAMEL_CASE_UPPER",
            CAMEL_CASE_LOWER: "CAMEL_CASE_LOWER",
            SNAKE_CASE_HYPHENS: "SNAKE_CASE_HYPHENS",
            SNAKE_CASE_UNDERSCORES_LOWER: "SNAKE_CASE_UNDERSCORES_LOWER",
            SNAKE_CASE_UNDERSCORES_UPPER: "SNAKE_CASE_UNDERSCORES_UPPER",
            UNKNOWN: "UNKNOWN"
        })
        .service('IdentifierService', IdentifierService);

    IdentifierService.$injector = ['Case'];

    function IdentifierService(Case) {
        var service = {
            getCaseType: getCaseType,
            isAlpha: isAlpha,
            isLowerCase: isLowerCase,
            isUpperCase: isUpperCase
        };
        return service;

        function getCaseType(string) {
            if (string.indexOf("-") > -1) {
                var words = string.split("-");
                if (checkAlphaLower(words.join(""))) {
                    return Case.SNAKE_CASE_HYPHENS;
                }
            } else if (string.indexOf("_") > -1) {
                var words = string.split("_");
                if (checkAlphaLower(words.join(""))) {
                    return Case.SNAKE_CASE_UNDERSCORES_LOWER;
                } else if (checkAlphaUpper(words.join(""))) {
                    return Case.SNAKE_CASE_UNDERSCORES_UPPER;
                }
            } else if (checkAlphaLower(string[0]) && checkAlpha(string)) {
                return Case.CAMEL_CASE_LOWER;
            } else if (checkAlphaUpper(string[0]) && checkAlpha(string)) {
                return Case.CAMEL_CASE_UPPER;
            }
            return Case.UNKNOWN;
        }

        function checkAlphaLower(string) {
            var i =0;
            while (i < string.length){
                var character = string.charAt(i);
                if (!isAlpha(character) || isUpperCase(character)){
                    return false;
                }
                i++;
            }
            return true;
        }

        function checkAlphaUpper(string) {
            var i =0;
            while (i < string.length){
                var character = string.charAt(i);
                if (!isAlpha(character) || isLowerCase(character)){
                    return false;
                }
                i++;
            }
            return true;
        }

        function checkAlpha(string) {
            var i =0;
            while (i < string.length){
                var character = string.charAt(i);
                if (!isAlpha(character)){
                    return false;
                }
                i++;
            }
            return true;
        }

        function isAlpha(char) {
            return /[a-zA-Z]/.test(char);
        }

        function isLowerCase(char) {
            return char === char.toLowerCase() && char !== char.toUpperCase();
        }

        function isUpperCase(char) {
            return char === char.toUpperCase() && char !== char.toLowerCase();
        }
    }

})();