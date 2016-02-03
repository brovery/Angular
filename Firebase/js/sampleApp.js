var app = angular.module("sampleApp", ["restangular", "firebase"]);

app.factory("chatMessages", ["Restangular",
    function(Restangular) {
        var ref = "https://blistering-heat-9918.firebaseio.com/";

        return Restangular.setBaseUrl(ref)
            .setRequestSuffix('.json')
            .setFullResponse(true)
            .service('chatRoom');
    }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages", "comboService",
    // we pass our new chatMessages factory into the controller
    function($scope, chatMessages, comboService) {
        $scope.user = comboService.userName;
        $scope.success = comboService.success;
        $scope.updateMess = updateMess;
        updateMess();

        function updateMess() {
            chatMessages.one().get().then(function(resp) {
                $scope.messages = resp.data.plain();
                $scope.data = resp.data;
            });
        }

        $scope.addMessage = function() {

            chatMessages.post({
                from: $scope.user.userName,
                content: $scope.message
            }).then(function() {
                updateMess();
            });

            $scope.message = "";
        };

        $scope.deleteMessage = function(key) {
            $scope.data.customDELETE(key).then(function() {
                updateMess();
            });
        };

        $scope.updateMessage = function(key) {
            var newVal = window.prompt("New value?");

            $scope.data.customOperation('patch', key, "", "", {content: newVal}).then(function() {
                updateMess();
            });
        };

    }
]);

app.factory('loginService', ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://blistering-heat-9918.firebaseio.com");
        return $firebaseAuth(ref);
    }
]);

app.controller('loginCtrl', ["$scope", "loginService", "comboService",
    function($scope, loginService, comboService) {
        $scope.user = comboService.userName;
        $scope.pass = "";
        $scope.success = comboService.success;


        $scope.Login = function() {
            var login = loginService.$authWithPassword({
                email: $scope.user.userName,
                password: $scope.pass
            }).then(function() {
                comboService.toggleLogin();
            }).catch(function(error) {
                console.error("Authentication failed: ", + error);
            });
        };


    }
]);

app.service('comboService', [
    function() {
        var cs = this;
        cs.success = {"loggedIn": false};
        cs.userName = {"userName": "brovery@yahoo.com"};
        cs.toggleLogin = toggleLogin;

        function toggleLogin() {
            cs.success.loggedIn = true;
        }
    }
]);