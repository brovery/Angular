(function() {
    "use strict";

    angular
        .module('app', [
            'app.identifier',
            'app.filters'
        ])
        .value('tests', [
            'MyApp',
            'myApp',
            'my-app',
            'my_app',
            'MY_APP',
            'my-APP',
            'my_APP',
            'MY_APp',
            'MyApp1',
            'myApp1',
            'my-app1',
            'my_app1',
            'MY_APP1',
            'MY&APP'
        ]);

})();